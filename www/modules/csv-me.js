// "One time" export to CSV from more complex JSON-format
// not to be confused with CSV export for Calender
function toCSV() {
  let tlen = data.teachers.length;
  let all = '';
  $('.big').find('tr').each((i, x) => {
    $(x).find('td, th').each((i, x) => {
      let d = $('<div/>');
      d.html($(x).html().split('<br>').join('_'));
      d.find('.courseName, .ltime').remove();
      all += d.text() + ';';
    });
    all += '\n';
  });
  all = all.split('Datum/vecka/dag').join('Datum;Vecka;Dag');
  all = all.split('\n');
  let all2 = '';
  for (let row of all) {
    let r = row.split(';');
    for (let i = 0; i < tlen + 1; i++) {
      r.pop();
    }
    r = r.join(';').split(' ;').join(';').split('_').join(' ');
    all2 += r + '\n';
  }
  return all2;
}

// Read which days teachers teach from CSV
function fromCSV(html) {
  let d = $('<div/>');
  d.html(html);
  d.find('tr.mifhgf').not('tr:first').each((i, x) => {
    if (i >= matrix.length) { return }
    let y = matrix[i+1];
    y[0] = new Date(y[0]).toLocaleDateString('Sv')
    $(x).find('td').each((i, x) => {
      // if(matrixColumnsToHide.includes(i)){
      //   return
      // }
      let td = $(x);
      let cname = td.find('.courseName').prop('outerHTML') || '';
      if(y[i]){
        y[i] = y[i].replace(/\[(.*?)\]/g, ' <span class="has-note" onclick="toggleNote(this)">*<span class="note">$1</span></span> '); // extract notes
        // let teacher = data.teachers.find(x => x.initials === y[i].split('?')[0].split(' ')[0].trim()) || {};
        let initials = y[i].split('?')[0].split(' ')[0].trim();
        let teacher = initials && data.larare[initials]? data.larare[initials] : {};
        if(!td.hasClass('not-teaching')){
          td.css({ backgroundColor: teacher.color || '' });
        }
        /*if (y[i].includes('?')) {
          y[i] = y[i].replace(/(\S{1,10}\?)/g, "<em>$1</em>")
        }*/
      }
      td.html((y[i] || '&nbsp;') + cname);
    })
  });
  //console.log(d.html())
  return d.html();
}