function analyze(html, weeksForAvg) {
  // reset data.teachers and copy teachers from data.larare hash to data.teachers array (very temp..)
  data.teachers.length = 0;
  for (let initials in data.larare) {
    data.teachers.push(data.larare[initials])
  }
  // reset stats
  for (let t of data.teachers) {
    t.totalDays = 0;
    t.weekDays = 0;
    t.totalDaysForAvg = 0;
  }
  let dom = $('<div class="wrap">' + html + '</div>');
  dom.find('tr').each((i, el) => {
    el = $(el);
    let trWeek = parseInt(el.find('td').eq(1).text())
    q.s && i > 0 && el.find('td').first().text() < q.s && el.css({ display: 'none' });
    el.append('<td class="before-ana"></td>');
    let date = el.find('td').first().text();
    for (let t of data.teachers) {
      t.totalDays = t.totalDays || 0;
      t.weekDays = t.weekDays || 0;
      t.totalDaysForAvg = t.totalDaysForAvg || 0;
      el.hasClass('mon') && (t.weekDays = 0);
      let td = $('<td class="sum"/>');
      el.append(td);
      //i === 0 && td.html(t.initials + '<br><span class="daysPerWeek">x</span>');
      i === 0 && td.html(t.initials);
      i === 0 && td.attr('title', t.name);
      i === 0 && td.css({ backgroundColor: t.color });
      let lements = el.find('td:contains(' + t.initials + ')'); // find all teacher cells in the row
      let l = lements.not('.not-teaching').length;  // count all teaching cells
      let notl = lements.length - l; // calculate any non teaching cells

      // special half-jensen days
      if (l > 1 && t.initials === 'JW' && '2021-05-05,2021-05-12,2021-05-19,2021-05-26,2021-06-02'.includes(date)) {
        l = 1;
      }
      if (l > 1 && t.initials === 'TF' && '2021-06-09'.includes(date)) {
        l = 1;
      }

      i !== 0 && (l + notl) !== 0 && td.html(l + notl)
      notl && td.addClass('can-not-teach');
      i !== 0 && (l + notl) > 1 && td.addClass('double-booked');
      t.totalDays += l - notl; // subtract non-teaching cells from teaching stats
      t.weekDays += l;
      el.hasClass('sat') && td.html('<b>' + t.weekDays + '</b>');
      if (weeksForAvg.includes(trWeek)) {
        t.totalDaysForAvg += l - notl;
      }
    }
  });

  let days = 0;
  dom.find('.daysPerWeek').each((i, el) => {
    el = $(el);
    days += data.teachers[i].totalDaysForAvg;
    el.html((data.teachers[i].totalDaysForAvg / weeksForAvg.length).toFixed(1).split('.').join(','));
  });

  let h = dom.html().split('</tr>');
  h[0] = h[0].split('<td').join('<th').split('</td>').join('</th>');
  createWeeksForAvgsSelect(weeksForAvg)
  setTimeout(calcWeekTotals, 2000)
  return h.join('</tr>');
}

function calcWeekTotals() {
  let sums = {}
  $('.big .sat').each(function (i) {
    let sat = $(this)
    sat.find('.sum').each(function () {
      let week = sat.find('td:nth-child(1)').text().split('-')[0] + sat.find('td:nth-child(2)').text();
      if (!sums[week]) {
        sums[week] = {
          sum: 0,
          el: $(this)
        }
      }
      sums[week].sum += parseInt($(this).text())
    })
  })
  $('tbody tr').each(function (i) {
    let week = $(this).find('td:nth-child(1)').text().split('-')[0] + $(this).find('td:nth-child(2)').text();
    if (sums[week] && $(this).hasClass('sat')) {
      $(this).append(`<td class="sum week-sum"><b>${sums[week].sum}</b></td>`)
    } else {
      $(this).append(`<td> &nbsp; &nbsp; </td>`)
    }
  });
  $('td.sum:contains("5")').not('td.week-sum').addClass('a-stretch');
}

function createWeeksForAvgsSelect(weeksForAvg) {
  let $select = $('<select id="choose-weeks-for-avg"></select>')
  for (let i = 0; i < weeksList.length; i++) {
    $select.append(`<option value="${i}"${weeksList[i] === weeksForAvg ? ' selected="selected"' : ''}>v${weeksList[i][0]}-${weeksList[i][weeksList[i].length - 1]}</option>`)
  }
  let $div = $('<span style="margin:0 15px;">Medelstatistik:</span>')
  $div.append($select)
  $(function () {
    $('footer>div:last-child').prepend($div)
  })
}

$('body').on('change', '#choose-weeks-for-avg', function () {
  localStorage.weeksForAvgIndex = $(this).val();
  location.reload();
})