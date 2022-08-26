import { randomLightColor } from "./utilities.js";
import { getData, hashify } from "./data.js"
import { config } from "./config.js";

const ts = await getData('teachers')
const teachers = hashify(ts)
let teachersForStats = ts.filter(t => !t.hide)
teachersForStats = hashify(teachersForStats, 'initials')
const courses = await getData('courses/' + config.ongoingCoursesSpan.startDate + '/' + config.ongoingCoursesSpan.endDate)
courses.map(c => c.color = randomLightColor())
//const coursesById = hashify(courses)
const coursesByClass = hashify(courses, 'class', true)
const allClasses = await getData('classes_view')
// trim classes not having courses
const activeClassesIds = Object.keys(coursesByClass)
const classes = allClasses.filter(klass => activeClassesIds.includes(klass.id.toString()))
const weekStats = {}

export async function renderSchema(startDate, endDate, today = new Date()){

  // html
  let html = `<table><thead><tr><th colspan="3">Datum/Vecka/Dag</th>`;
  
  // table head
  for (let klass of classes) {
    html += `<th><div>` + klass.schoolShortName.replace(' ', '&nbsp;') + '<br>' + (klass.blog ? '<a href="' + klass.blog + '" target="_blank"><i class="fas fa-external-link-alt"></i>' + klass.shortName + '</a>' : klass.shortName) + '</div></th>';
  }

  // add statistics headers
  // add XX (unassigned days)
  html += `<th class="sum stats-begin" title="Ingen lärare tilldelad" style="background-color: ${teachersForStats.XX.color};">XX</th>`
  // add teachers
  for(let initials in teachersForStats){
    let teacher = teachersForStats[initials]
    if(teacher.hide || initials === "XX") continue
    html += `<th class="sum" title="${teacher.firstname + ' ' + teacher.lastname}" style="background-color: ${teacher.color};">${initials}</th>`
  }

  html += `<th class="sum" title="Veckosummor" style="background-color: black;"></th>`

  // end table head
  html + '</tr></thead>';

  // dates are inserted at this point
  // html += await renderDays(startDate, endDate, today)
  html += '<tbody>__DAYS__</tbody>'
  html += '</table>';
  // html = fromCSV(html);
  return html;
}

export async function renderDays(startDate, endDate, today){
  let calendar = await getData('calendar/' + startDate + '/' + endDate)
  moment.locale('sv') 
  let nowDate = new Date(today)
  let html = ""
  for(let date in calendar.days){
    let day = calendar.days[date]
    let passed = date < nowDate ? 'passed' : ''
    let holiday = (day.class && day.class.holiday && day.class.holiday[0].holiday)? 'holiday' : ''
    let holidayElement = (day.class && day.class.holiday)? '<div class="holiday-name">' +  day.class.holiday[0].holiday + '</div>' : ''      
    html += '<tr class="' + passed + ' ' + day.weekdayClass + ' ' + holiday + '"><td>' + date + holidayElement + '</td><td><span>' + day.week + '</span></td><td class="day">' + day.weekday + '</td>';
    
    // classes
    for (let klass of classes) {          
      let showDetails = false
      let details = ''
      let teachersHtml = ''
      // add days
      if(day.class && day.class[klass.shortName]){
        let events = day.class[klass.shortName]
        let i = 0;            
        // add class events (in a day)    
        for(event of events){
          let locationHtml = (event.location && event.location.toLowerCase().includes("distans"))? '<span class="location" title="' + event.location + '">d</span>' : ''
          let startTime = event.startTime || klass.defaultStartTime
          let endTime = event.endTime || klass.defaultEndTime
          showDetails = (startTime || endTime || event.notes || event.agenda || (event.location && event.location.toLowerCase() !== "distans") )
          event.teacher = teachers[event.teacher]
          if(event.teacher.initials==='ZZ'){
            teachersHtml += '<span class="teacher"><em>' + event.notes.split(' ')[0] + '</em></span>' 
            event.teacher.color = 'white'
          }else{
            teachersHtml += '<span class="teacher" style="background-color:' + event.teacher.color + '">' + event.teacher.initials + locationHtml + '</span>'
          }
          if(showDetails){            
            details += '<span class="event" style="background-color:' + event.teacher.color + '">'
            // if(event.course) details += '<span class="course">' + coursesById[event.course].name + '</span>'
            if(startTime && endTime) details += '<span class="times">' + startTime + '–' + endTime + '</span>'
            if(event.location && event.location.toLowerCase() !== "distans") details += '<span class="notes">' + event.location + '</span>'
            if(event.notes) details += '<span class="notes">' + event.notes + '</span>'
            if(event.agenda) details += '<span class="agenda">' + event.agenda + '</span>'   
            details += '</span>' // <i class="edit-event fa fa-pen"></i>
          }
        }
      }
      html += '<td>'     
      if(teachersHtml || details){
        html += '<div class="class">'
      }
      if(teachersHtml) html += '<div class="teachers"'
      if(showDetails) html += '  '
      if(teachersHtml) html += '>' + teachersHtml + '</div>'
      // fa-info-circle instead of caret?
      if(showDetails) html += '<div class="has-details"><i class="fa fa-caret-right"></i></div><div class="details">' + details + '</div>'
      if(teachersHtml || details){
        html += '</div>'
      }

      // add started / ongoing course
      if(coursesByClass[klass.id]?.length){
        for(let course of coursesByClass[klass.id]){
          if(course.hide){
            continue
          }
          let courseEndDate = course.endDate
          if(endDate < courseEndDate){
            courseEndDate = endDate // prevent course ui from overflowing
          }
          if(date >= course.startDate && date <= courseEndDate){
            if(!course.active){
              course.active = true
              html += '<div style="background-color:' + course.color +
                  '" class="courseName" data-start="' + course.startDate + '" data-end="' + courseEndDate + '" data-course-id="' + course.id + '"><div class="text">'
                  + ((course.plan ? '<a href="' + course.plan + '" target="_blank"><i class="fas fa-external-link-alt"></i>' + course.name + '</a>' : course.name) + '&nbsp;'.repeat(20)).repeat(10)
                  + '</div><div class="after" style="background:linear-gradient(0, '
                  + course.color + ','
                  + course.color.replace(/hsl/, 'hsla').replace(/%\)/, '%,0)')
                  + ')"></div></div>'
            }else{ // active
              $('.big .courseName[data-course-id="' + course.id + '"]').attr('data-end', courseEndDate)
            }
          }else{
            if(course.active){
              course.active = false
            }
          }

        }
      }

      html += '</td>'
    }

    // add statistics columns
    if(day.weekdayClass === "sat") { // weekly roundup day events
      // add for XX
      let dayEvents = weekStats[day.week].teachers["XX"].dayEvents
      html += `<td class="sum roundup stats-begin">${dayEvents? '<b>' + dayEvents + '</b>' : ""}</td>`
      // add weekly for teachers
      let weeklySum = 0
      for (let initials in teachersForStats) {
        let teacher = teachersForStats[initials]
        if (teacher.hide || initials === "XX") continue
        dayEvents = weekStats[day.week].teachers[initials].dayEvents
        html += `<td class="sum roundup">${dayEvents? '<b>' + dayEvents + '</b>' : ""}</td>`
        weeklySum += weekStats[day.week].teachers[initials].dayEvents
      }

      html += `<td class="sum roundup week-sum"><b>${weeklySum}</b></td>`

    }else if(day.weekdayClass === "sun"){ // weekly roundup hours
      // add for XX
      let hours = weekStats[day.week].teachers["XX"].hours
      html += `<td class="sum roundup stats-begin">${hours? '<em>' + hours + 'h</em>' : ""}</td>`
      // add weekly for teachers
      let weeklySumHours = 0
      for (let initials in teachersForStats) {
        let teacher = teachersForStats[initials]
        if (teacher.hide || initials === "XX") continue
        hours = weekStats[day.week].teachers[initials].hours
        html += `<td class="sum roundup"><em>${hours? '<em>' + hours + 'h</em>' : ""}</td>`
        weeklySumHours += weekStats[day.week].teachers[initials].hours
      }

      html += `<td class="sum roundup week-sum"><em>${weeklySumHours}h</em></td>`

    }else if(holiday){
      html += `<td class="sum stats-begin" colspan="${2 + Object.keys(teachersForStats).length}"></td>`

    }else { // daily for non-holiday weekdays only
      // add for XX
      html += `<td class="sum stats-begin">${day.stats && day.stats[teachersForStats.XX.id] && day.stats[teachersForStats.XX.id].dayEvents || ""}</td>`

      // add daily for teachers
      for (let initials in teachersForStats) {
        let teacher = teachersForStats[initials]
        if (teacher.hide) continue
        // console.log(date, day.class)
        if(!weekStats[day.week]){
          weekStats[day.week] = {teachers:{}}
        }
        if(!weekStats[day.week].teachers[initials]){
          weekStats[day.week].teachers[initials] = {dayEvents:0,hours:0}
        }
        weekStats[day.week].teachers[initials].dayEvents += day.stats && day.stats[teacher.id] && day.stats[teacher.id].dayEvents || 0
        weekStats[day.week].teachers[initials].hours += day.stats && day.stats[teacher.id] && day.stats[teacher.id].hours || 0
        if(initials !== "XX"){
          html += `<td class="sum ">${day.stats && day.stats[teacher.id] && day.stats[teacher.id].dayEvents || ""}</td>`
        }
      }

      // add sum column (empty on weekdays)
      html += `<td class="sum"></td>`
    }

    html + '</tr>';
  }
  return html
}