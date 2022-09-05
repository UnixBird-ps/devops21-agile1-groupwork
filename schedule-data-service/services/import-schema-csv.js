const db = require('better-sqlite3')('./database/nodehill_schedule.db', {fileMustExist: true /*, verbose: console.log*/ })
const fs = require('fs')
let schema;
try {
    schema = fs.readFileSync('../www/schema.csv', 'utf8')    
} catch (err) {
    console.error(err)
}
schema = schema.split('\n')
let headers = schema.shift()
headers = headers.split(';')
schema = schema.map(day=>day.split(';'))
let events = []
let teachersIds = {
    "BB":1,
    "JW":2,
    "MH":3,
    "TF":4,
    "MR":5,
    "JB":6,
    "ML":7,
    "XX":8,
    "CM":9,
    "AS":10,
    "MN":11,
    "TK":12,
    "NH":13,
    "AB":14,
    "SM":15,
    "MI":16,
    "MS":17,
    "DM":18,
    "HJ":19,
    "AH":20,
    "ZZ":21
}
let teachersInitials = Object.keys(teachersIds)
let classesIds = {
    "EC HBG FEU19e":14,
    "EC HBG WIN19e":15,
    "EC Malmö Java19e":16,
    "EC Malmö Java20e":17,
    "EC Malmö MVT19":18,
    "EC FEU20e":19,
    "HAK OPA20":12,
    "HAK OPA20X":21,
    "HAK OPA21":13,
    "HAK PYAI1":23,
    "IHM DAS20":24,
    "IHM GDAS19":25,
    "DEV21M":26,
    "FRK20G":27,
    "FRK20S":28,
    "FWK20G":29,
    "FWK20S":30,
    "TTK20G":31,
    "TTK21G":32,
    "MI DAN20":33,
    "MI DCD20M":34,
    "MI FED20m":35,
    "MI FED21m":36,
    "MI OLM20":37,
    "MI OLM20D":38,
    "MI OLM21m":39,
    "MI WAN20":40,
    "MI WAN21m":41,
    "MI WCM20":42,
    "MI WCM21":43,
    "Newton .NET19n":44,
    "Newton .NET20n":45,
    "Newton .NET21n":46,
    "Newton Java19n":47,
    "Newton Java20n":48,
    "Newton Java21n":49,
    "Newton Krav21n":50,
    "PlusHS Java19p":51,
    "PlusHS Java20gbg":52,
    "PlusHS Java20p":53,
    "PlusHS Java21gbg":54,
    "PlusHS Java21h":55,
    "PlusHS Java21v":56,
    "Övrigt Upptagen":57
}
for(let i=3;i<headers.length;i++){ 
    for(day of schema){
        if(day[i]){
            // skip holidays
            if(['2021-01-06', '2021-04-02', '2021-04-05', '2021-05-13', '2021-05-14', '2021-06-25', '2022-01-06', '2022-04-18', 
            '2022-04-15'].includes(day[0])) continue
            // parse that damned entry
            let entry = {}
            let found = false
            for(let initials of teachersInitials){
                if(day[i].includes(initials)){             
                    found = true       
                    entry[initials] = day[i]
                }
            }
            if(!found){
                entry['ZZ'] = day[i]
            }
            for(let initials in entry){
                let notes = entry[initials].split(']').join(' ').split('[').join(' ').split(initials).join(' ')
                events.push({
                    date: day[0],
                    className: headers[i],
                    class: classesIds[headers[i]],
                    teacherInitals: initials,     
                    teacher: teachersIds[initials],              
                    notes: notes? notes.trim() : null,
                    quota: 1 / Object.keys(entry).length
                })
            }
        }
    }
}

console.log(events)

// commit to db
let results = []
let errors = []
for(let event of events){
    let query = "INSERT INTO schedule (class, teacher, date, notes, quota) VALUES(@class, @teacher, @date, @notes, @quota)"
      try{
        let statement = db.prepare(query)
        results.push(statement.run({class: event.class, teacher: event.teacher, date: event.date, notes: event.notes, quota: event.quota}))
      }catch(e){
        console.log(e)
        errors.push(e)
      }
}

console.log('events', events.length, 'results', results.length, 'errors', errors.length)


