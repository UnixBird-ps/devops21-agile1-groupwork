const db = require('better-sqlite3')('./database/nodehill_schedule.db', {fileMustExist: true /*, verbose: console.log*/ })
const data = require('./data.json')
let courses = data.filter( entry => entry.type==='course' )

let classesIds = {
    "FEU19e":14,
    "WIN19e":15,
    "Java19e":16,
    "Java20e":17,
    "MVT19":18,
    "FEU20e":19,
    "OPA20":12,
    "OPA20X":21,
    "OPA21":13,
    "PYAI1":23,
    "DAS20":24,
    "GDAS19":25,
    "DEV21M":26,
    "FRK20G":27,
    "FRK20S":28,
    "FWK20G":29,
    "FWK20S":30,
    "TTK20G":31,
    "TTK21G":32,
    "DAN20":33,
    "DCD20M":34,
    "FED20m":35,
    "FED21m":36,
    "OLM20":37,
    "OLM20D":38,
    "OLM21m":39,
    "WAN20":40,
    "WAN21m":41,
    "WCM20":42,
    "WCM21":43,
    ".NET19n":44,
    ".NET20n":45,
    ".NET21n":46,
    "Java19n":47,
    "Java20n":48,
    "Java21n":49,
    "Krav21n":50,
    "Kram5":50,
    "Java19p":51,
    "Java20gbg":52,
    "Java20p":53,
    "Java21gbg":54,
    "Java21h":55,
    "Java21v":56,
    "DAO":58
}

// commit to db
let results = []
let errors = []
for(let course of courses){
    let query = "INSERT INTO courses (name, class, points, startDate, endDate) VALUES(@name, @class, @points, @startDate, @endDate)"
      try{
        let statement = db.prepare(query)
        results.push(statement.run({name: course.name, class: classesIds[course.edu], points: (course.yhp || null), startDate: course.startdate, endDate: course.enddate}))
      }catch(e){
        console.log(e)
        errors.push(e)
      }
}

console.log('events', courses.length, 'results', results.length, 'errors', errors.length)