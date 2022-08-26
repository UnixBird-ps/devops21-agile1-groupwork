// basis for averages
const weeksList = [
    [32, 33, 34, 35, 36],
    [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
    [52, 53, 1],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25], [26, 27, 28, 29, 30, 31]
];

let _ww = +localStorage.weeksForAvgIndex;
_ww = isNaN(_ww) ? 'AUTO' : _ww;

let weeksForAvg = _ww === 'AUTO' ? 'AUTO' : weeksList[_ww]

if (weeksForAvg === 'AUTO') {
  // delete weeksForAvg;
  weeksForAvg = weeksList[3];
}

let dates = dateSpan()

export const config = {
    startDate: "2022-08-01", // dates.startDate,
    endDate: "2023-01-01", // dates.endDate,
    infiniteScrollDaysToAdd: 28, // four weeks
    infiniteScrollTimeOut: 700,
    ongoingCoursesSpan:{ // scope to grab ongoing courses within, not a perfect solution
      startDate: "2022-01-03",
      endDate: "2023-06-25",
    },    
    weeksList,
    weeksForAvg,
    scrollToToday: true,
    authenticatedUser: {}
}

function dateSpan(){
  // start on last monday from now (or today if its monday)
  let startDate = moment()
  if(startDate.day() !== 0){
    while(startDate.day()>0){  
      startDate = startDate.subtract(1, 'days')
    }
    startDate = startDate.add(1, 'days')
  }else{
    startDate = startDate.subtract(6, 'days')
  }
  // end on sunday 8 weeks later
  let endDate = moment(startDate.format("YYYY-MM-DD")).add(55, 'days')
  // format
  endDate = endDate.format("YYYY-MM-DD")
  startDate = startDate.format("YYYY-MM-DD")
  return {
    startDate,
    endDate
  }
}