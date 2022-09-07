import { sleep } from "./utilities.js";
import { readSearchParams, locationParam } from "./utilities.js";

let data = {} // to be replaced with actual data to match requirements below

export function renderToolbar(){
    let q = readSearchParams()
    return `
    <footer>
        <button class="preview-changes" style="margin-right:12px;display:none">Preview changes</button>
        ${locationParam('preview') ? '<button class="go-live" style="margin-right:12px">Go live</button>' : ''}
        <!-- <button onclick="location.href=\'/logout\'">Logout</button>&nbsp;&nbsp; -->
        <button id="goToToday">Gå till idag</button>&nbsp;&nbsp;
        <div style="float:right">${q.nof ? '' : filters(data)}</div>
    </footer>
    `
}
  
export function setFilterInUrl(e){
    let el = $(e.target);
    let val = el.val();
    val = val || 'alla';
    val === 'alla' && (val = '');
    el.blur();
    location.hash = encodeURIComponent(val);
}
  
export async function applyFilter() {
    let val = decodeURIComponent((location.hash || '#').slice(1) || 'alla');
    $('#filters').val(val);
    let wait = $('<div class="wait">' + 'Visar ' + val + '...</div>');
    $('body').append(wait);
    await sleep(50);
    $('th, td').show();
    if (val !== 'alla') {
      let columnsToHide = [...new Array($('tr').last().find('td').length - 3)].map((x, i) => i + 4);
      $('.big th:contains(' + val + '), .big th:contains(' + val.split(' ').join('\u00a0') + '), .big td:contains(' + val + ')').each((i, el) => {
        let t = el.tagName;
        el = $(el);
        let column = el.index() + 1 + 2 * (t == 'TH');
        columnsToHide = columnsToHide.filter(x => x !== column);
      });
      $(columnsToHide.map(x => 'td:nth-child(' + x + '), th:nth-child(' + (x - 2) + ')').join(',')).hide();
      $('aside td, aside th').show();
    }
    await sleep(200);
    window.scroll(0, 0);
    $('body').removeClass('boot');
    wait.remove();
    updateDownloadLink(val);
}

function filters(data) {
    return ''
    let html = '<!--<a target="_blank" class="download" href="#">Hämta kalenderdata</a>-->&nbsp;&nbsp;&nbsp;Visa: <select id="filters"><option value="alla">Alla</option>'
    html += data.teachers.map(x => '<option value="' + x.initials + '">' + x.name + '</option>').join('');
    html += '<option></option>';
    let schools = [... new Set(data.edus.map(x => x.school))];
    html += schools.map(x => '<option value="' + x + '">' + x + '</option>').join('');
    html += '</select>';
    return html;
}
  
function updateDownloadLink(val) {
    let l = $('.download');
    if (val.length !== 2) {
      l.hide();
      return;
    }
    l.show();
    l.attr('href', csvForTeacher(val));
    l.text('Hämta ' + val + ':s kalender');
    l.attr('download', val + '-calender-data.csv');
}
