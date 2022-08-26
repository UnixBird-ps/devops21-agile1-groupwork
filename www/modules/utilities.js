import { config } from "./config.js";

export function sleep(ms){
  return new Promise(res => setTimeout(res, ms));
} 

export function randomLightColor() {
    let color = "hsl(" + Math.random() * 360 + ",25%, 75%)";
    return color;
}

export function daysBetweenStartAndEnd(x) {
    return (new Date(x.enddate).getTime() - new Date(x.startdate).getTime()) / (24 * 60 * 60 * 1000)  // x.enddate.diff(x.startdate, 'days');
}

 // params from location
export function locationParam(x) {
  return (location.href.split(x + '=')[1] || '').split(/(\&|#)/)[0];
}

export function param(x) {
  return (location.href.split(x + '=')[1] || '').split(/(\&|#)/)[0];
}

export function readSearchParams() {
    return Object.fromEntries(location.search.slice(1).split('&')
      .map(x => x.split('=').map(x => decodeURIComponent(x))));
}

export function pickWeeksForAvg(dt) {
    let thisWeek = ISO8601_week_no(dt)
    for (let wks of config.weeksList) {
      if (wks.includes(thisWeek)) {
        return wks
      }
    }
}

function ISO8601_week_no(dt) {
    let tdt = new Date(dt.valueOf());
    let dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    let firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
        tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}