import { config } from "./config.js";

export function toggleDetails(){
    $(this).next('.details').toggle()
    $(this).children('.fa').toggleClass("fa-caret-left fa-caret-down");
}

export function hidePastTime() {
    let hide = $(this).prop('checked');
    if (hide) {
      window.scrollTo(0, 0);
      $('body').css({ marginTop: -($('.today').offset().top - 44) });
    }
    else {
      $('body').css({ marginTop: 0 });
    }
    window.scrollTo(0, 0);
}

export function resizer() {
    let h = document.querySelector('header');
    let t = document.querySelector('body > table');
    let a = document.querySelector('aside > table');
    if (!t) { return; }
    h.style.width = (t.offsetWidth) + 'px';
    a.style.width = (t.offsetWidth) + 'px';
    $('aside').css({ marginTop: -$('aside').outerHeight() });
    if (!helgdagreplaced) {
        replaceHelgdagWithStyle();
    }
    setCourseHeights()
}

export function goToTop(speed = 100) {
  $('html,body').animate({
    scrollTop: $(".big tbody").offset().top -40
  },speed);
}

export function goToToday(today = new Date()) {
    markToday(today)
    let todayCell = $(`aside tr>td:contains("${today.toLocaleDateString('sv')}")`)
    let weekStart = todayCell.parent().prevAll('.sat')[0] || todayCell.parent()
    if(weekStart && $(weekStart) && $(weekStart).offset()){
      $('html,body').animate({
        scrollTop: $(weekStart).offset().top - 20
      },'slow');
    }
}

export function toggleHiddenEdus() {
    $('.hide-edu').toggle()
}

let fffTimer = 20;
export function firefoxFix() {
  if ($('aside tr').first().offset().top < 0) {
    $('aside').css({ marginTop: -$('aside').outerHeight() });
  }
  else {
    fffTimer < 1000 && (fffTimer *= 2);
    setTimeout(firefoxFix, fffTimer);
  }
}

let helgdagreplaced = false;
function replaceHelgdagWithStyle() {
  let a = $('tr:contains("HELGDAG")').add($('tr:contains("KLÄMDAG")')).add($('tr:contains("SOMMARAFTON")'));;
  if (!a.length) { return; }
  a.addClass('sun').find('td').each(function () { $(this).text().length < 3 && $(this).html('') });
  helgdagreplaced = true;
}

function setCourseHeights(){
    $('.big .courseName').each(function(){
        let endDate = $(this).attr('data-end')
        let end = $('.big tr>td:first-child:contains('+endDate+')').parent().next()
        if(end.length < 1){
          end = $('.big tr>td:first-child:contains('+endDate+')').parent()
        }
        $(this).height(end.offset().top - $(this).offset().top)
    })
}

export function markToday(today = new Date()) {
    $('.today').removeClass('today')
    let todayCell = $(`tr>td:contains("${today.toLocaleDateString('sv')}")`)
    todayCell.parent().addClass('today')
}

function toggleNote(el) {
    $(el).children('.note').toggle();
}