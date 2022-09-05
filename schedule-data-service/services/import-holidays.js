// use sparingly, only 50 req total quota on the free API, only needs to be run once ever really
const https = require('https')
const holidaysApiKey = 'v2WMtNJUylic0Xwx5aOqK7nQbLPverBEkzpd6mYT'
const params = {
    from: '2018-01-01',
    to: '2030-12-31'
}

let url = `/v2/dagar.json?fran=${params.from}&till=${params.to}&key=${holidaysApiKey}&id=1234`
let data = ''
const apiReq = https.request({
    hostname: 'api.arbetsdag.se',
    port: 443,
    path: url,
    method: 'GET'
}, apiRes => {
    apiRes.on('data', d => {
        data +=d
    })
    apiRes.on('end', () => {
        data = JSON.parse(data)
        // truncate holidays
        db.prepare('DELETE FROM holidays').all()
        // insert new
        let statement = db.prepare('INSERT INTO holidays (date, name) VALUES (@date, @name)')
        for(let holiday of data.helgdagar){
            let name = holiday.helgdag.split(':').pop()
            let date = holiday.datum
            statement.run({ date: date, name: name})
        }
        console.log('statusCode', apiRes.statusCode)
        console.log('stored these holidays to db')
        console.log(data.helgdagar)
    });
})

apiReq.on('error', error => {
    console.error(error)
})

apiReq.end()