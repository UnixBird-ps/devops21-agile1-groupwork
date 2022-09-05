import { goToToday, toggleDetails } from "./ui.js";
import { activateEditMode, goLive } from "./edit-mode.js";
import { buildCSVfromMatrix } from "./matrix.js";
import { hidePastTime } from "./ui.js";
import { setFilterInUrl, applyFilter } from "./toolbar.js";

export function registerEventHandlers(){
    $('body').on('click', '.has-details', toggleDetails)
}

export function registerEditModeEventHandlers(){
    $('body').on('click', '.preview-changes', buildCSVfromMatrix);
    $('body').on('dblclick', 'td.teacher', activateEditMode)
    $('body').on('click', '.go-live', goLive)
    $('body').on('click', '.hideThen', hidePastTime)
}

export function registerToolbarEventHandlers(){
    $('body').on('change', 'footer #filters', setFilterInUrl)
    $('body').on('click', '#goToToday', ()=>{goToToday()})
    // $('body').on('click', '#toggleHiddenEdus', toggleHiddenEdus)
    window.onhashchange = applyFilter;
}
