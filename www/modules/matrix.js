let matrix = [];

export function buildMatrix(dayData) {
  console.log('matrix.buildMatrix called')
  matrix = dayData.map(x => x.split(';'));
}

export async function buildCSVfromMatrix() {
  console.log('matrix.buildCSVfromMatrix called')
  $('.data-change').each(function () {
    let me = $(this);
    let row = +me.attr('data-row');
    let cell = +me.attr('data-col');
    matrix[row][cell] = me.val();
  });
  let csv = { csv: matrix.map(x => x.join(';')).join('\n') };

  // tidy up very bad note conversion
  let tempDiv = $('<div/>');
  tempDiv.html(csv.csv);
  csv.csv = tempDiv.text();
  csv.csv = csv.csv.split('"').join('').split('<em>').join('').split('</em>').join('');
  csv.csv = csv.csv.replace(/ *\*([^;\n]*)/g, '[$1]');

  let r = await (await fetch('/save-preview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(csv)
  })).json();
  location.replace('/?edit=1&preview=' + r.fpath);
};