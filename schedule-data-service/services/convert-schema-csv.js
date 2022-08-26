const db = require('better-sqlite3')('./database/nodehill_schedule.db', {fileMustExist: true /*, verbose: console.log*/ })

// convert schema table from schema.csv style to schedule table style

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

let results = []
for(let columnName in classesIds){
    let classId = classesIds[columnName]
    let err = ''
    let query = 'UPDATE schema SET `class` = '+classId+', larare = `'+columnName+'` WHERE `'+columnName+'` != ""'
    console.log(query)
    let res
    try{
        //let statement = db.prepare(query)
        //res = statement.run()
    }catch(e){
        // console.log(e)
        err = e
    }
    results.push([query, err?err:res])
}

console.log(results)

