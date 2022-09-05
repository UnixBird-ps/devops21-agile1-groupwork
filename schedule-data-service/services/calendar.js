const moment = require("moment")
const db = require('better-sqlite3')('./database/nodehill_schedule.db', {fileMustExist: true /*, verbose: console.log*/ })

function makeCalendar(fromDate = '2022-01-01', toDate = '2022-01-31', locale = 'sv'){

    moment.locale(locale)

    const calendar = {
        from: fromDate,
        to: toDate,
        locale: locale,
        days: {}
    }
    const dayStep = 1000*60*60*24 // length of a day in ms

    for(let step = new Date(calendar.from).getTime(); step <= new Date(calendar.to).getTime(); step = step + dayStep){   
        let date = moment(step).format("YYYY-MM-DD")
        calendar.days[date] = {
            week: moment(step).format("WW"),
            weekday: moment(step).format("ddd"),
            weekdayClass: moment(step).locale('en').format("ddd").toLowerCase()
        }
    }  
    return calendar;    
}

function populateCalendar(calendar){
    
    let statement = db.prepare(`
        SELECT *
        FROM classes
    `)
    let classes = statement.all()
    classes = hashify(classes, 'id')
    classes[0] = {name:"Helg", shortName:"holiday"}

    statement = db.prepare(`
        SELECT *
        FROM courses
    `)
    let courses = statement.all()
    courses = hashify(courses, 'id')

    statement = db.prepare(`
        SELECT *
        FROM days
        WHERE date >= :from 
        AND date <= :to
        ORDER BY date, class, startTime
    `)
    let schedule = statement.all({from: calendar.from, to: calendar.to})

    for(let event of schedule){        
        if(!calendar.days[event.date].class){
            calendar.days[event.date].class = {}
        }
        let className = classes[event.class || 0].shortName
        if(!calendar.days[event.date].class[className]){
            calendar.days[event.date].class[className] = []
        }
        calendar.days[event.date].class[className].push(event)

        // stats
        if(event.teacher) {
            if (!calendar.days[event.date].stats) {
                calendar.days[event.date].stats = {}
            }
            if (!calendar.days[event.date].stats[event.teacher]) {
                calendar.days[event.date].stats[event.teacher] = {dayEvents: 0, hours: 0}
            }
            // day events
            calendar.days[event.date].stats[event.teacher].dayEvents++
            // hours
            let hours = 0
            if(event.specificHoursThisDay) {
                hours = event.specificHoursThisDay
            //}else if(event.startTime && event.endTime){
            //    hours =  moment.duration(moment(event.endTime, 'HH:mm').diff(moment(event.startTime, 'HH:mm'))).asHours()
            }else if(event.course && courses[event.course].hoursPerDay){
                hours = courses[event.course].hoursPerDay
            }else if(event.class && classes[event.class].defaultHoursPerDay){
                hours = classes[event.class].defaultHoursPerDay
            }
            calendar.days[event.date].stats[event.teacher].hours += hours
        }
    }

    return calendar;
}

function hashify(array, key){
    let hash = {}
    for(item of array){
        hash[item[key]] = item
    }
    return hash
}

exports.makeCalendar = makeCalendar
exports.populateCalendar = populateCalendar


/*
CREATE VIEW days AS
SELECT s.*,
       h.*
FROM schedule s
LEFT JOIN holidays h USING(date)
UNION ALL
SELECT s.*,
       h.*
FROM holidays h
LEFT JOIN schedule s USING(date)
WHERE s.date IS NULL
*/