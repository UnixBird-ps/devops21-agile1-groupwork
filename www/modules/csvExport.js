let csvTeachers;

function csvParse(html) {
  let teachers = data.teachers.map(x => ({ ...x, dates: [] }));
  $(html).find('tr').each((i, x) => {
    if (i === 0) { return; }
    let tds = $(x).find('td');
    let date = tds.eq(0).text();
    tds.each((i, x) => {
      x = $(x);
      let teacher = teachers.find(y => x.text().includes(y.initials));
      teacher && teacher.dates.push({
        date, edu: data.edus[i - 3],
        time: x.find('.ltime').text().split(' ')[1]
      });
    });
  });
  csvTeachers = teachers;
}

function csvForTeacher(initials) {
  return; // broken so do not use
  let dates = csvTeachers.find(x => x.initials === initials).dates;
  let csv = 'Subject,Start Date,Start Time,End Date,End Time,Location,Description,Color\n';
  for (let d of dates) {
    let courseName = (data.courses.find(
      x => {
        return x.edu === d.edu.name && d.date >= x.startdate && d.date <= x.enddate
      }
    ) || { name: 'Ingen kurs' }).name;
    let time = d.time.split('-');
    csv += [
      courseName,
      d.date,
      time[0] + ':00:00',
      d.date,
      time[1] + ':00:00',
      d.edu.school + ' ' + d.edu.name,
      ''
    ].join(',') + '\n';
  }
  return 'data:text/csv;charset=utf-8,' + csv;
}