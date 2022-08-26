// imports
import { config } from "./config.js"
import {processAuthentication} from "./auth.js";
import { locationParam, readSearchParams } from "./utilities.js"
import {resizer, goToToday, firefoxFix, goToTop, markToday} from "./ui.js"
import { registerEventHandlers, registerEditModeEventHandlers, registerToolbarEventHandlers } from "./event-handlers.js"
import { renderSchema, renderDays } from "./schema.js"
import { renderToolbar } from "./toolbar.js"
import { makeInvoices } from "./invoice.js"
import {registerInfiniteScroll} from './infinite-scroll.js'

config.auth = await processAuthentication()
if(config.auth.loggedIn){
    await load()
}else{
    location.assign('/login.html')
}

export async function load(){
    let today = new Date()
    let q = readSearchParams();
    let html = await renderSchema(config.startDate, q.e || config.endDate, today);
    let days = await renderDays(config.startDate, q.e || config.endDate, today);
    html = html.replace('__DAYS__', days)
    let $asideTable = $(html);
    $asideTable.find('td.teacher, td.sum').remove()
    $asideTable = $asideTable[0].outerHTML

    document.body.innerHTML = ''
      + '<header>' + html + '</header>'
      + html.replace(/>/, ' class="big">')
      + '<aside>' + $asideTable + '</aside>'
      + '<div class="stable-date-header"><img src="/images/nodehill.jpg"></div>'
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
    else if (config.scrollToToday && config.startDate < today) {
        setTimeout(goToToday, 250);
    } else {
        markToday()
        setTimeout(goToTop, 250);
    }

    registerEventHandlers()
    registerToolbarEventHandlers()
    if(locationParam('edit') === '1') registerEditModeEventHandlers()
    registerInfiniteScroll()
}

