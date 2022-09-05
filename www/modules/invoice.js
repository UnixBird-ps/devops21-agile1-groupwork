import { param } from "./utilities.js"

export async function makeInvoices() {

  function niceKr(x) {
    return new Intl.NumberFormat('se-SE', { style: 'currency', currency: 'SEK' }).format(x).split(/\s*kr/)[0]
  }

  $('body').addClass('invoices');
  $('body').html('<p>Genererar fakturor...</p>');
  let r = await (await fetch('/makeInvoices/' + param('invoice'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })).json();
  $('body').html(`
    <div style="display:none" class="sending">Skickar fakturorna... Var god vänta...</div>
    <button class="send-invoices">Skicka fakturor</button>
    <h1>Fakturor Node Hill, ${r.month} ${location.href.split('invoice=')[1].slice(0, 4)}</h1>
    <div><a href="/${r.zipFile}"><b style="color:black">PDF:er</b> (samtliga som zip-fil)</a><span>Summa (kr)
    </span><span>Timmar</span><span>kr/timme</span>
    <span>Leverans&nbsp;</span><span>Faktura&nbsp;</span><span>Förfaller&nbsp;</span><span>Skickad?&nbsp;</span></div>
  `+ r.pdfNames.map(x => `
    <div><a target="_blank" href="/${x.sent ? 'sent-invoices' : 'pdfs-generated'}/${x.name}">${x.name}</a><span>${niceKr(x.sum)}</span><span>${niceKr(x.hours)}</span><span>${niceKr(x.sum / x.hours)}</span><span>${x.levDatum}</span><span>${x.faktDatum}</span><span>${x.dueDatum}</span><span>${x.sent ? 'Skickad' : (x.sendable ? 'Kan skickas' : 'Vänta')}</span></div>
  `).join(''));
  $('body').append('<hr/>');
  let totalSumma = r.pdfNames.reduce((a, c) => a + c.sum, 0);
  let totalTimmar = r.pdfNames.reduce((a, c) => a + (c.hours > 0 ? c.hours : 0), 0);
  $('body').append('<h4><span>Totalsumma:</span><span>' + niceKr(totalSumma) + '</span></h4>');
  $('body').append('<h4><span>Totalt timmar:</span><span>' + niceKr(totalTimmar) + '</span></h4>');
  $('body').append('<h4><span>Genomsnitt kr/timme:</span><span>' + niceKr(totalSumma / totalTimmar) + '</span></h4>');
  $('body').append(perSchool(r.pdfNames));
  $('.send-invoices').click(async () => {
    let invoices = r.pdfNames.filter(x => x.sendable);
    if (invoices.length === 0) {
      await Modal.alert('Det finns inga fakturor att skicka just nu!');
      return;
    }
    if (!await Modal.confirm('Skicka dessa fakturor:<br>' + invoices.map(x => x.name).join('<br>'), 'Skicka', 'Avbryt')) { return; }
    let pass = await Modal.prompt('Thomas gmail-lösenord:', 'OK', 'Avbryt', 'prompt', 'password');
    if (!pass) { return; }
    if (!await Modal.confirm("Kommer nu att skicka fakturorna.<br><br>Detta tar några sekunder efter det att du klickat på Skicka!", 'Skicka', 'Avbryt')) { return; }
    $('.sending').show();
    let { problems, info } = await (await fetch('/sendInvoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pass, send: invoices.map(x => ({ name: x.name, sendTo: x.sendTo, emailHeader: x.emailHeader, date: x.faktDatum })) })
    })).json();
    $('.sending').hide();
    if (problems.length) {
      await Modal.alert("Följande fakturor gick inte att skicka:<br>" + problems.join('<br>') + '<br>(se console.log för detaljer');
      console.log(info);
    }
    else {
      location.reload();
    }
  });
}

function perSchool(invoices) {
  let h = {};
  let schoolHash = {};
  for (let invoice of invoices) {
    let schoolName = invoice.name.split('-')[3];
    schoolHash[schoolName] = schoolHash[schoolName] || 0;
    schoolHash[schoolName] += invoice.sum;

    // For moms calc 2021
    let invoiceNo = invoice.name.split('faktura-')[1].split('-')[0];
    if (schoolName === 'Plush') { continue; }
    h[invoiceNo] = [schoolName, invoice.sum];
  }
  console.log(JSON.stringify(h, '', '  '));
  let html = '<hr>';
  for (let [schoolName, sum] of Object.entries(schoolHash)) {
    html += `<p style="margin:0"><span style="display:inline-block;width:60px">${schoolName}</span><span style="display:inline-block;width:150px;text-align:right">${new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(sum)}</span></p>`
  }
  return html;
}