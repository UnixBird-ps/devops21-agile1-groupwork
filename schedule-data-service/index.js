const db = require("./modules/db.js")()
const express = require("express")
const server = express()
server.use(express.json())
const port = 7666
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

// REST API routes

require('./routes/teachers.js')(server, db)
require('./routes/login.js')(server, db)

const apiDescription = require('./api-description.js')(host)

server.get("/data", async (req, res) => {
  res.json(apiDescription)
})

server.get('/data/calendar/:from/:to', (req, res)=>{
    const cal = calendar.makeCalendar(req.params.from, req.params.to, req.params.locale)
    const populated = calendar.populateCalendar(cal)
    res.json(populated)
})

server.get('/data/courses/:from/:to', (req, res)=>{
  let query = "SELECT * FROM courses WHERE startDate >= @startDate AND endDate <= @endDate"
  let result = db.prepare(query).all({startDate: req.params.from, endDate: req.params.to})
  res.json(result)
})

server.post('/data/courses', (req, res)=>{
  let query = "INSERT INTO courses VALUES(@id, @name, @shortName, @class, @points, @startDate, @endDate, @plan, @invoiceItem, @hoursPerDay)"
  let statement = db.prepare(query)
  let result = statement.run(req.body)
  res.json(result)
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

server.post('/data/invoices/', (req, res)=>{
  if(!req.body.startDate || !req.body.endDate || !req.body.school){
    res.json({
      error: "Insufficient request data"
    })
  }
  let createdInvoice = createInvoice(req.body, db)
  res.json(createdInvoice)
})

server.post('/data/generate-schedule', generateSchedule)

// generic one-to-one table API

server.get('/data/:table', (req, res)=>{ // but limit which tables to query with ACL
  let query = "SELECT * FROM " + req.params.table
  let result = db.prepare(query).all()
  res.json(result)
})