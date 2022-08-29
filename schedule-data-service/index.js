const db = require("./modules/db.js")()
const express = require("express")
const server = express()
server.use(express.json())
const port = process.env.PORT ? process.env.PORT : 30080;
const host = `http://localhost:${port}`

// sessions
let cookieParser = require('cookie-parser')
server.use(cookieParser())
let session = require('express-session')
server.use( session( {
  secret: 'keyboard cat jksfj<khsdka',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true with https
    httpOnly: true
  }
}))

// bypass 2FA verification (dev only)
server.use(function(req,res,next){req.bypassVerification = true; next()})

// ACL
const acl = require('./services/acl.js')
server.use(acl)

// start
server.listen(port,() => {
  console.log(host)
  console.log('server running on port ' + port)
})

const calendar = require('./services/calendar.js')
const generateSchedule = require('./services/generate-schedule')

server.use('/', express.static('../www'))
server.use('/admin', express.static('../admin/dist'))
server.use('/assets', express.static('../admin/dist/assets'))

// Specialized REST API routes
require('./routes/login.js')(server, db)
require('./routes/teachers.js')(server, db)
require('./routes/courses.js')(server, db)
require('./routes/classes.js')(server, db)
require('./routes/schools.js')(server, db)

const apiDescription = require('./api-description.js')(host)

server.get("/data", async (req, res) => {
  res.json(apiDescription)
})

server.get('/data/calendar/:from/:to', (req, res)=>{
  const cal = calendar.makeCalendar(req.params.from, req.params.to, req.params.locale)
  const populated = calendar.populateCalendar(cal)
  res.json(populated)
})

server.get('/data/classes_view/:all?', (req, res)=>{
  let query
  if(req.params.all){
    query = "SELECT * FROM classes_view WHERE ORDER BY schoolShortName, shortName"
  }else{
    query = "SELECT * FROM classes_view WHERE hide = 0 ORDER BY schoolShortName, shortName"
  }  
  let result = db.prepare(query).all()

  for(let i=result.length-1;i>=0;i--){
    if(result[i].schoolShortName==='Nodehill'){ // move Nodehill to the very end of the ordered set
      let row = result.splice(i,1)
      result.push(row[0])
      break;
    }
  }
  res.json(result)
})

const createInvoice = require('./services/create-invoice.js')

server.post('/data/invoices/', (request, response)=>{
  if(!request.body.startDate || !request.body.endDate || !request.body.school){
    response.json({
      error: "Insufficient request data"
    })
  }
  let createdInvoice = createInvoice(request.body, db)
  response.json(createdInvoice)
})

server.post('/data/generate-schedule', generateSchedule)

// generic one-to-one table API

server.get('/data/:table', (request, response) =>
  { // but limit which tables to query with ACL
    // Basic SQL query
    let query = "SELECT *, count(*) OVER() AS total_count FROM " + request.params.table
    let table = request?.params?.table;
    let hq = request.query;
    let filter = hq?.filter;
    let sort = hq?.sort;
    let range = hq?.range;
    let cr = '';
    if ( filter ) { filter = JSON.parse( filter ); }
    if ( sort )
    {
      sort = JSON.parse( sort );
      query += ` ORDER BY ${sort[ 0 ]} ${sort[ 1 ]}`;
    }
    // Support for pagination
    if ( range )
    {
      // Get the range array
      range = JSON.parse( range );
      // Update SQL query with data for items per page
      query += ` LIMIT ${1 + range[ 1 ] - range[ 0 ]}`;
      // Update SQL query start
      if ( range[ 0 ] > 0 ) query += ` OFFSET ${range[ 0 ]}`;
      // Update string for Content-Range, should be 'unit start-end/total'
      if ( table ) cr += table;
      cr += ` ${range[ 0 ]}-${range[ 1 ]}`;
    }

    let result = db.prepare(query).all()
    if ( result[ 0 ]?.total_count ) cr += `/${result[ 0 ].total_count}`;
    response.setHeader( 'Content-Range', cr);
    response.setHeader( 'X-Total-Count', cr);
    response.json(result)
  }
)

server.get('/data/:table/:id', (request, response) =>
  { // but limit which tables to query with ACL
    let query = "SELECT * FROM " + request.params.table + " WHERE id = @id"
    let result = db.prepare(query).get({id: request.params.id})
    response.json(result)
  }
)

server.delete('/data/:table/:id', (request, response) =>
  { // but limit which tables to query with ACL
    let query = "DELETE FROM " + request.params.table + " WHERE id = @id"
    let result;
    try
    {
      result = db.prepare(query).run({id: request.params.id})
    }
    catch(e)
    {
      console.error(e);
      result = e;
    }
    response.json(result)
  }
)
