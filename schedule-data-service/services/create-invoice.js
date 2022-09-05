const PDF = require('pdfkit');
const fs = require('fs');
const path = require('path');
const moment = require("moment")
const hashify = require('../modules/hashify.js')

// Nice swedish format
function niceKr(x) {
    return new Intl.NumberFormat('se-SE', { style: 'currency', currency: 'SEK' }).format(x).split(/\s*kr/)[0].split('−').join('-');
    // Note: Not same minus sign (all though it looks so)
    // replacing to one that works with PDF
}

function invoiceMonthNice(justMonth = false, invoiceMonth) {
    let a = invoiceMonth.split('-');
    let m = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
      'juli', 'augusti', 'september', 'oktober', 'november', 'december'][+a[1] - 1];
    if (justMonth) { return m; }
    return 'Samlingsfaktura ' + m + ' ' + a[0];
}

function invoiceDataService(body, db){
    /* 
    {
        "startDate": "2022-01-01",
        "endDate": "2022-01-31",
        "school": 3,
        "class": "INT id (optional)",
        "course": "INT id (optional)"
    }
    SELECT * FROM schools WHERE id = 2;
    SELECT * FROM classes_view WHERE schoolId = 2;
    SELECT * FROM days WHERE date >= "2022-03-01" and date <= "2022-04-15" AND class IN(SELECT id FROM classes_view WHERE schoolId = 2);
    */

    let query = "SELECT * FROM schools WHERE id = @id"
    let school = db.prepare(query).all({id: body.school}).shift()
    console.log('school', school)  

    query = "SELECT * FROM classes_view WHERE schoolId = @schoolId"
    let classes = db.prepare(query).all({schoolId: body.school})  
    if(body.class){
        classes = classes.filter(c => c.id == body.class)
    }

    query = "SELECT * FROM courses WHERE class IN (" + classes.map(c=>c.id).join(',') + ")"
    let courses = db.prepare(query).all()
    if(body.course){
        courses = courses.filter(c => c.id == body.course)
    }

    //let query = "SELECT * FROM schedule s, classes c, schools WHERE s.date >= @startDate AND s.date <= @endDate AND s.class = c.id AND c.school = schools.id AND c.school = @school"
    //let result = db.prepare(query).all({startDate: req.body.startDate, endDate: req.body.endDate, school: req.body.school})      

    query = "SELECT * FROM schedule WHERE date >= @startDate and date <= @endDate AND class IN (" + classes.map(c=>c.id).join(',') + ")"
    let days = db.prepare(query).all({startDate: body.startDate, endDate: body.endDate})
    console.log(days)
    return {
        school,
        classes,
        courses,
        days
    }
}

module.exports = function createInvoice(body, db){

    const invoiceData = invoiceDataService(body, db);
    console.log(invoiceData)

    let info = { // body.info and/or from db
        address: ["address line 1","address line 2", "address line 3", "address line 4"],
        kundnr: body.school, // invoiceData.school.id
        fakturaDatum: body.invoiceDate || moment().format("YYYY-MM-DD"),
        leveransDatum: body.paymentDueDate || moment().add(30, "days").format("YYYY-MM-DD"),
        yourRef: body.yourRef,
        ourRef: body.ourRef,
        eduName: "Yrkes Högskola", // invoiceData.school.name
        changeTheRub: null,        
        hoursPerDay: 6,
        krPerHour: 950,
        comment: ["Some little comment", "Comment line 2"],
        momsPercent: 0.25,
        onlyMoms: null,
        lines: [
            ["Custom line 1 LEFT", 10, "pennor"], 
            ["Custom line 2 LEFT", 20, "lektioner"], 
            ["Custom line 3 LEFT", 1100, "kr/h"]
        ]
    }

    let courses = hashify(invoiceData.days, "course", "teacher", true)
    /*{ // body.courses and/or from db
        "Grundläggande nybörjare": ["BB", "AA", "CC"],
        "Fortsättande sofomor": ["DD", "BB", "BB"]
    }*/

    let topInfo = {
        'Kundnr': info.kundnr,
        'Fakturadatum': info.fakturaDatum,
        'Leveransdatum': info.leveransDatum,
        'Er referens': info.yourRef,
        'Vår referens': info.ourRef,
        'Dröjsmålsränta': 'Vid betalning efter förfallodagen debiteras',
        'x': 'ränta enligt räntelagen.'
    };
   
    let footerInfo = [
        'x',
        'Adress:',
        'Node Hill AB',
        'Kyrkogatan 21',
        '222 22 LUND',
        'Sverige',
        'x',
        'Telefon:',
        '079 - 313 62 44',
        '',
        'E-post:',
        'thomas@nodehill.com',
        'x',
        'Bankgiro:',
        '5053-7711',
        '',
        'Säte:',
        'Lund',
        'x',
        'Organisationsnr:',
        '559028-9459',
        'Momsreg.nr:',
        'SE559028945901',
        'Godkänd för F-skatt'
    ];
    let invoiceMonth = '2022-01' // req.params.month / body.month
    let invoiceNo = 2345
    let co = invoiceNo
    let logo = path.join(__dirname, 'invoice-images', 'logo.png');
    let pdfFolder = path.join(__dirname, 'invoices');
    let pdfName = 'NodeHill-faktura.pdf';
    let w = fs.createWriteStream(path.join(pdfFolder, pdfName));
    let y = 0;

    // build pdf
    let doc = new PDF({ size: 'A4', margin: 0 });    
    
    doc.pipe(w);

    doc.image(logo, 40, 15, { width: 250 });

    doc
        .font('Helvetica-Bold').fontSize(14)
        .text('Faktura', 320, 30);
    doc
        .font('Helvetica-Bold').fontSize(11)
        .text('Fakturanummer', 320, 49);
    doc
        .font('Helvetica').fontSize(11)
        .text(co, 420, 49);

    y = 90;
    doc.rect(310, 80, 245, 64).stroke();
    for (let line of info.address) {
        doc
            .font('Helvetica').fontSize(9)
            .text(line, 320, y);
        y += 12;
    }    

    y = 157;
    for (let key in topInfo) {
        let val = topInfo[key];
        doc
            .font('Helvetica-Bold').fontSize(9)
            .text(key.length < 2 ? '' : key + ':', 40, y);
        doc
            .font('Helvetica').fontSize(9)
            .text(val, 120, y);
        y += 12;
    }

    doc.rect(40, 250, 515, 500).stroke();
    doc.moveTo(40, 270).lineTo(515 + 40, 270).stroke();

    doc.rect(515 + 40, 500 + 250, -300, -120).fillAndStroke('#eee', "#000");
    doc.moveTo(45, 695).lineTo(250, 695).stroke();

    let col = [47, 245, 305, 365, 425];
    let hlines = ['Benämning', 'Antal', 'Enhet', 'À-pris', 'Summa'];
    y = 257;
    let colTemp = col.slice(), first = true;
    for (let hline of hlines) {
        doc
            .font('Helvetica-Bold').fontSize(9).fillColor('#000')
            .text(hline, colTemp.shift(), y, { width: first ? undefined : 120, align: first ? 'left' : 'right' });
        first = false;
    }

    doc
        .font('Helvetica-Bold').fontSize(10)
        .text(info.changeTheRub || invoiceMonthNice(false, invoiceMonth), 50, 285)
    doc
        .font('Helvetica-Bold').fontSize(10)
        .text(info.eduName, 50, 300);

    y = 325;
    let sum = 0;
    let totHours = 0;

    // Loop through courses
    if (!info.lines) {
        for (let course in courses) {
            if (edu === 'MI DCD20M') { continue; }
            doc
                .font('Helvetica').fontSize(10)
                .text('Kurs: ' + course, 50, y);
            let c = courses[course];
            y += 15;
            doc
                .font('Helvetica').fontSize(10)
                .text(c.length + ' tillfällen (' + c.map(x => +x.split('-').pop()).join(', ') + ' ' + invoiceMonthNice(true, invoiceMonth) + ')', 50, y);
            y += 15;
            let hours = info.hoursPerDay * c.length;
            totHours += hours;
            let pSum = hours * info.krPerHour;
            let r = { align: 'right', width: 120 };
            doc
                .font('Helvetica').fontSize(10)
                .text('x ' + niceKr(info.hoursPerDay) + ' timmar/tillfälle = ' + niceKr(hours) + ' timmar', 50, y);
            doc
                .font('Helvetica').fontSize(10)
                .text(niceKr(hours), col[1], y - 30, r);
            doc
                .font('Helvetica').fontSize(10)
                .text('timmar', col[2], y - 30, r);
            doc
                .font('Helvetica').fontSize(10)
                .text(niceKr(info.krPerHour), col[3], y - 30, r);
            doc
                .font('Helvetica').fontSize(10)
                .text(niceKr(pSum), col[4], y - 30, r);
            sum += pSum;
            y += 30;
        }
    }

    if (info.lines) {
        let fsize = 10;
        let lheight = 15;
        let sw = false;
        let r = { align: 'right', width: 120 };
        let lineCo = 0;
        for (let line of info.lines) {
            let co = 0;
            let lastPart;
            for (let part of line) {
                doc
                    .font(sw && co === 0 && lineCo !== 0 ? 'Courier' : 'Helvetica').fontSize(lineCo === 0 && sw ? 14 : fsize)
                    .text(co > 2 || co === 1 ? niceKr(part) : part, co === 0 ? col[co] + 3 : col[co], y, co > 0 ? r : '');
                co++;
                lastPart = part;
            }
            let add = isNaN(lastPart) ? 0 : +lastPart
            sum += add;
            y += lheight;
            if (sw && lineCo === 0) { y += lheight; }
            lineCo++;
        }
        y += 15;
    }

    if (info.comment) {
        doc
            .font('Helvetica-Oblique').fontSize(10)
            .text('Kommentar:', 50, y);
        y += 15;
    }
    for (let x of info.comment || []) {
        doc
            .font('Helvetica').fontSize(10)
            .text(x, 50, y);
        y += 15;
    }

    let moms = sum * info.momsPercent / 100;

    let sumIncMoms = sum + moms;
    if (info.onlyMoms) {
        moms = sum;
        sum = 0;
        sumIncMoms = moms;
    }
    let oresAvrund = -Math.round(100 * (sumIncMoms - Math.round(sumIncMoms))) / 100;
    sumIncMoms = Math.round(sumIncMoms);
    let s = info.fakturaDatum.split('-').map(x => +x);
    let forfalloDatum = new Date(new Date(s[0], s[1] - 1, s[2]).getTime() + 31 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (info.momsPercent === 0) {
        doc
            .font('Helvetica').fontSize(10)
            .text('Då fakturan avser yrkeshögskole-', 50, 640);
        doc
            .font('Helvetica').fontSize(10)
            .text('undervisning med examinationsansvar', 50, 655);
        doc
            .font('Helvetica').fontSize(10)
            .text('utgår ej någon moms.', 50, 670);
    }       

    doc
        .font('Helvetica-Bold').fontSize(10)
        .text('Exkl. moms', 50, 705);
    doc
        .font('Helvetica-Bold').fontSize(10)
        .text('Moms (' + info.momsPercent + '%)', 50, 720);
    doc
        .font('Helvetica-Bold').fontSize(10)
        .text('Avrundning', 50, 735);
    doc
        .font('Helvetica').fontSize(10)
        .text(niceKr(sum), 50, 705, { align: 'right', width: 195 });
    doc
        .font('Helvetica').fontSize(10)
        .text(niceKr(moms), 50, 720, { align: 'right', width: 195 });
    doc
        .font('Helvetica').fontSize(10)
        .text((oresAvrund < 0 ? '-' : '') + niceKr(Math.abs(oresAvrund)), 50, 735, { align: 'right', width: 195 });
    doc
        .font('Helvetica-Bold').fontSize(16)
        .text('Förfallodatum:', 280, 650);
    doc
        .font('Helvetica-Bold').fontSize(16)
        .text('Bankgiro:', 280, 675);
    doc
        .font('Helvetica-Bold').fontSize(16)
        .text('Att betala:', 280, 700);
    sumIncMoms > 0 && doc
        .font('Helvetica-Bold').fontSize(12)
        .text('Ange fakturanummer ' + co + ' vid betalning!', 280, 728);
    doc
        .font('Helvetica').fontSize(16)
        .text(forfalloDatum, 280, 650, { align: 'right', width: 240 });
    doc
        .font('Helvetica').fontSize(16)
        .text('5053-7711', 280, 675, { align: 'right', width: 240 });
    doc
        .font('Helvetica').fontSize(16)
        .text(niceKr(sumIncMoms), 280, 700, { align: 'right', width: 240 });

    let cols = [40, 195, 350, 477];
    
    while (footerInfo.length) {
        let line = footerInfo.shift();
        if (line === 'x') {
            y = 765; col = cols.shift(); continue;
        }
        doc
            .font(line.includes(':') || line.includes('F-skatt') ? 'Helvetica-Bold' : 'Helvetica').fontSize(8)
            .text(line, col, y);
        y += 11.5;
    }

    doc.end();

    // handle after pdf generated
    w.on('finish', () => {
        console.log(pdfName + ' created')
        return {created: pdfName}
    })
}