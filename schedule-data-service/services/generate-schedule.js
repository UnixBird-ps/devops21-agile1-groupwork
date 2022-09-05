const db = require("../modules/db.js")()
const moment = require("moment")
moment.locale('sv')

module.exports = function generateSchedule(req, res){

  const body = req.body
  const startDate = moment(body.startDate)
  const endDate = moment(body.endDate)
  const daysToCreate = []

  for (let day = moment(startDate); day.diff(endDate, 'days') <= 0; day.add(1, 'days')) {
    // test valid input first
    const validDays = ["må","ti","on","to","fr","lö","sö"]
    if(!body.weekdays.every(d => validDays.includes(d))){
      return res.json({
        "error": "weekdays contains invalid elements. Valid elements are " + validDays
      })
    }
    // then
    console.log(day.format('YYYY-MM-DD'), day.format('dd'))
    console.log(body.weekdays[0], day.format('dd'))
    if(body.weekdays[0] === day.format('dd').toLowerCase()){
      daysToCreate.push({
        teacher: body.teachers[0],
        date: day.format('YYYY-MM-DD'),
        class: body.class,
        course: body.course,
        startTime: body.startTime || null,
        endTime: body.endTime || null,
        notes: body.notes || null,
        agenda: body.agenda || null,
        quota: body.quota || 1,
        specificInvoiceItem: body.specificInvoiceItem || null,
        specificHoursThisDay: body.specificHoursThisDay || null
      })
      /* circulating teachers and days makes it possible to repeat fairly complex scheduling, like
        f ex ["må","on","fr","on","fr"], will schedule a two-week interval
        and we can also make a teacher interval, like [1,1,2,1,2].
        We can alternatively choose to enter all days of a course in a row as an array of all the weekdays.
        BUT IMPORTANTLY there is an anti-pattern: If one week is scheduled ["må","ti",...] and the next week (the array continues) is scheduled [...,"on","to"] it will be interpreted as the same week, resulting in an error.
     */
      body.weekdays.push(body.weekdays.shift()) // circulate days
      body.teachers.push(body.teachers.shift()) // circulate teachers
    }
  }

  const query = "INSERT INTO schedule (class, course, teacher, date, startTime, endTime, notes, agenda, quota, specificInvoiceItem, specificHoursThisDay) VALUES(@class, @course, @teacher, @date, @startTime, @endTime, @notes, @agenda, @quota, @specificInvoiceItem, @specificHoursThisDay)"
  const insert = db.prepare(query)
  const results = []
  const insertMany = db.transaction((daysToCreate) => {
    for (const day of daysToCreate){
      results.push(insert.run(day));
    }
  });
  insertMany(daysToCreate)
  res.json(results)
}