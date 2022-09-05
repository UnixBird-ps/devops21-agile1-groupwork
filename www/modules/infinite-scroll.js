import { config } from "./config.js";
import { renderDays } from "./schema.js";
import { sleep } from "./utilities.js";
import {goToTop} from "./ui.js";


export async function registerInfiniteScroll(){
    let loading = true;
    await sleep(config.infiniteScrollTimeOut * 3) // loading timeout
    loading = false
    let bounces = 0
    window.addEventListener('scroll', async function(){
        if(loading) return;
        const doc = document.documentElement;
        if(doc.scrollTop + doc.clientHeight > doc.scrollHeight - 20){
            await addDays(true)         
            loading = true;
            await sleep(config.infiniteScrollTimeOut)
            loading = false
        }else if(doc.scrollTop < 1){
            await addDays(false)
            loading = true;
            await sleep(config.infiniteScrollTimeOut)
            loading = false
        }
    });
}

let pendingAfter = false
let pendingBefore = false

async function addDays(after = true){
    let startDate = moment(config.startDate)
    let endDate = moment(config.endDate)
    if(after){        
        endDate = moment(endDate).add(config.infiniteScrollDaysToAdd, 'days', after).format('YYYY-MM-DD')
        if(!pendingAfter && endDate != config.endDate){
            pendingAfter = true
            let fromDate = moment(config.endDate).add(1, 'days').format('YYYY-MM-DD')
            await loadDays(fromDate, endDate, after)
            config.endDate = endDate;
            pendingAfter = false
        }
    }else{
        if(!pendingBefore && startDate != config.startDate){
            pendingBefore = true
            startDate = moment(startDate).subtract(config.infiniteScrollDaysToAdd, 'days').format('YYYY-MM-DD')
            let toDate = moment(config.startDate).subtract(1, 'days').format('YYYY-MM-DD')
            await loadDays(startDate, toDate, after)
            config.startDate = startDate
            pendingBefore = false
        }
    }
}

async function loadDays(start, end, after){
    let today = new Date()
    let days = await renderDays(start, end, today)
    if(after){
        $('tbody').append(days)
    }else{
        $('tbody').prepend(days)
        setTimeout(()=> goToTop(600), 600);
    }
}