const db = require("./modules/db.js")()
const express = require("express")
const server = express()
server.use(express.json())
const port = process.env.PORT ? process.env.PORT : 7666;
const host = `http://localhost:${port}`
const { debugMsg } = require("./debug-funcs.js");


// sessions
let cookieParser = require('cookie-parser')
server.use(cookieParser())
let session = require('express-session')
server.use(session({
  secret: 'keyboard cat jksfj<khsdka',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // set to true with https
    httpOnly: true
  }
}))

// bypass 2FA verification (dev only)
server.use(function (req, res, next) { req.bypassVerification = true; next() })

// ACL
const acl = require('./services/acl.js')
server.use(acl)

// start
server.listen(port, () => {
  console.log(host)
  console.log('server running on port ' + port)
})

const calendar = require('./services/calendar.js')
const generateSchedule = require('./services/generate-schedule')

server.use('/', express.static('../frontend/www'))
server.use('/admin', express.static('../frontend/admin/dist'))
server.use('/assets', express.static('../frontend/admin/dist/assets'))

// Specialized REST API routes
require('./routes/login.js')(server, db)
require('./routes/teachers.js')(server, db)
require('./routes/courses.js')(server, db)
require('./routes/classes.js')(server, db)
require('./routes/schools.js')(server, db)
require('./routes/invoiceitems.js')(server, db)

const apiDescription = require('./api-description.js')(host)

server.get("/data", async (req, res) => {
  res.json(apiDescription)
})

server.get('/data/calendar/:from/:to', (req, res) => {
  const cal = calendar.makeCalendar(req.params.from, req.params.to, req.params.locale)
  const populated = calendar.populateCalendar(cal)
  res.json(populated)
})

server.get('/data/classes_view/:all?', (req, res) => {
  let query
  if (req.params.all) {
    query = "SELECT * FROM classes_view WHERE ORDER BY schoolShortName, shortName"
  } else {
    query = "SELECT * FROM classes_view WHERE hide = 0 ORDER BY schoolShortName, shortName"
  }
  let result = db.prepare(query).all()

  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i].schoolShortName === 'Nodehill') { // move Nodehill to the very end of the ordered set
      let row = result.splice(i, 1)
      result.push(row[0])
      break;
    }
  }
  res.json(result)
})

const createInvoice = require('./services/create-invoice.js')

server.post('/data/invoices/', (request, response) => {
  if (!request.body.startDate || !request.body.endDate || !request.body.school) {
    response.json({
      error: "Insufficient request data"
    })
  }
  let createdInvoice = createInvoice(request.body, db)
  response.json(createdInvoice)
})

server.post('/data/generate-schedule', generateSchedule)

// generic one-to-one table API

server.get(
  '/data/:table',
  function getTable( request, response )
  { // but limit which tables to query with ACL
    let table = request.params.table; // Name of the table, taken from route string
    let hq = request.query;  // The URL query, the part after ? in URL
    let filter = hq?.filter; // Filter array in URL query
    let sort = hq?.sort;     // Sort array in URL query
    let range = hq?.range;   // Range tuple in URL query
    let cr = '';             // For Content-Range in HTTP response header
    // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
    // Start from a basic SQL query and continue building the SQL in later steps
    let sql = "SELECT *, count(*) OVER() AS total_count FROM " + table;
    // Continue building SQL query, update for filter
    if ( filter )
    {
      filter = JSON.parse( filter );
    }
    // Continue building SQL query, update for sort order
    if ( sort )
    {
      sort = JSON.parse( sort );
      sql += ` ORDER BY ${sort[ 0 ] } ${ sort[ 1 ] }`; //<column name> and <order>
    }

    // Support for pagination
    if (range)
    {
      // Convert from JSON to Object
      range = JSON.parse(range);
      // Continue building SQL query with data for items per page
      sql += ` LIMIT ${1 + range[1] - range[0]}`;
      // Continue building SQL query start
      if (range[0] > 0) sql += ` OFFSET ${range[0]}`;
      // Continue building Content-Range, in the end it should be 'unit start-end/total'
      if (table) cr += table;
      cr += ` ${range[0]}-${range[1]}`;
    }

    // console.log( sql );
    let results = db.prepare(sql).all();

    // Make sure result is an array, loop through it and convert some props so that React-Admin understands it
    if ( Array.isArray( results ) )
    {
      // Loop through all records
      for (let record of results) {
        // Remove the password prop if exists before transmitting the object
        if (Object.keys( record ).includes( 'password' ) ) delete record.password;
        // If the current record contains the 'roles' prop, convert it from a string to an array
        if (Object.keys( record ).includes( 'roles' ) ) record.roles = ( record.roles == '' || record.roles == null ) ? record.roles = [] : record.roles.split( ',' );
        // If the current record contains the 'hide' prop, convert it from an integer to a boolean
        if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == 0 ) ? false : true;
      }
    }


    // Continue building Content-Range
    if (results[ 0 ]?.total_count) cr += `/${results[ 0 ].total_count}`;
    response.setHeader( 'Content-Range', cr );
    response.setHeader( 'X-Total-Count', cr );

    response.json(results);
  }
)

server.get(
  '/data/:table/:id',
  function getRecord(request, response) {
    let sql = "SELECT * FROM " + request.params.table + " WHERE id = @id";
    let record = db.prepare(sql).get({ id: request.params.id });
    // Remove the password prop if exists before transmitting the object
    if (Object.keys(record).includes('password')) delete record.password;
    // Convert the 'roles' from a string to an array (DB -> React-Admin)
    if (Object.keys(record).includes('roles')) record.roles = (record.roles == '' || record.roles == null) ? record.roles = [] : record.roles.split(',');
    // Convert the 'hide' prop from an integer to a boolean (DB -> React-Admin)
    if (Object.keys(record).includes('hide')) record.hide = (record.hide == null || record.hide == 0) ? false : true;
    response.json(record);
  }
)

server.delete(
  '/data/:table/:id',
  function deleteRecord(request, response) { // but limit which tables to query with ACL
    let query = "DELETE FROM " + request.params.table + " WHERE id = @id"
    let result;
    try {
      result = db.prepare(query).run({ id: request.params.id })
    }
    catch (e) {
      // Future task. Fix better handling of error when trying to delete records with FK constraint
      console.error('Catched error:', e);
      response.statusCode = 500;
      result = { error: e };
    }
    response.json(result)
  }
)
