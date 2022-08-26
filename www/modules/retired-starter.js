import { locationParam, readSearchParams, pickWeeksForAvg, randomLightColor } from "./utilities.js";
import { buildMatrix } from "./matrix.js";
import { convertCSVToHash } from "./csv.js";
import { config } from "./config.js";
import { renderSchema } from "./schema.js"
import { resizer, goToToday, firefoxFix } from "./ui.js"
import { renderToolbar } from "./toolbar.js";

export let data;
let dayData = '';
let eduData = '';

export function starter(time = 0) {

  let schemaPath = '/schema.csv';
  if (locationParam('preview')) {
    schemaPath = '/previews/' + locationParam('preview');
  }

  setTimeout(async () => {
    // let dagar = await (await fetch('sheets/dagar.csv')).text()
    let dagar = await (await fetch(schemaPath)).text();
    dagar = convertCSVToHash(dagar, true)
    let kurser = await (await fetch('/sheets/kurser.csv')).text()
    kurser = convertCSVToHash(kurser)
    //console.log('kurser', kurser)
    let skolor = await (await fetch('/sheets/skolor.csv')).text()
    skolor = convertCSVToHash(skolor)
    let larare = await (await fetch('/sheets/larare.csv')).text()
    larare = convertCSVToHash(larare)
    let klasser = await (await fetch('/sheets/klasser.csv')).text()
    klasser = convertCSVToHash(klasser)
    let newDayData = await (await fetch(schemaPath)).text()
    let newEduData = await (await fetch('/data.json')).json()
    let changed = false
    if (newDayData.toString() !== dayData.toString()) {
      dayData = newDayData
      changed = true
    }
    if (newEduData.toString() !== eduData.toString()) {
      eduData = newEduData
      changed = true
    }

    dayData = dayData.split('\n');

    buildMatrix(dayData);

    if (time > 0) {
      config.scrollToToday = false
    }
    if (changed) {
      data = { edus: [], courses: [], teachers: [], larare: larare, kurser: kurser, dagar: dagar, skolor: skolor, klasser: klasser };
      start(config)
    }

  }, time);
}


async function start(config) {
    let today = new Date()
    let conf = Object.assign({
      // weeksForAvg: pickWeeksForAvg(today),
      scrollToToday: true
    }, config)
    // await applyData();
    let q = readSearchParams();
    let html = await renderSchema(conf.startDate, q.e || conf.endDate, today);

    //csvParse(html);
  
    //html = analyze(html, conf.weeksForAvg);
    let $asideTable = $(html);
    $asideTable.find('td.teacher, td.sum').remove()
    $asideTable = $asideTable[0].outerHTML

    document.body.innerHTML = ''
      + '<header>' + html + '</header>'
      + html.replace(/>/, ' class="big"')
      + '<aside>' + $asideTable + '</aside>'
      + '<div class="stable-date-header">Datum/Vecka/Dag</div>'
      // footer
      + renderToolbar()
  
    window.onresize = resizer;
    resizer();
    setInterval(resizer, 1000);
    setTimeout(() => $('.hideThen').click(), 1000);
    window.scroll(0, 0);
    navigator.userAgent.includes('Firefox') && firefoxFix();
    location.hash.length > 1 ? applyFilter() : $('body').removeClass('boot');
    if (location.href.includes('invoice')) {
      makeInvoices();
    }
    else if (conf.scrollToToday) {
      setTimeout(goToToday, 250);
    } else {
      markToday()
    }
}

async function applyData() {
  if (document.fonts) {
    document.body.innerHTML = "&nbsp;";
    await document.fonts.ready;
  }

  for (let item of eduData) {
    data[item.type + 's'].push(item);
  }
  data.courses.forEach(x => (x.color = x.color || randomLightColor()));
  data.edus.sort((a, b) => a.school + a.name > b.school + b.name ? 1 : -1);
}