# devops21-agile1-groupwork


# nodehill-schedule
# version 3.0
Scheduling & invoicing
## Start services
cd schedule-data-service
npm start 

## Schedule
REST API Description at `/data`


## Invoicing
REST API 

POST /data/invoices

```json
{
    "startDate": "date",
    "endDate": "date",
    "school": INT,
    "class": INT (optional),
    "course": INT id (optional)
}
```

Invoices PDFs are generated in /schedule-data-service/invoices<br>
<br><br>

Install all dependencies...
> cd admin ; npm install ; npm audit fix ; cd ..
> cd schedule-data-service ; npm install ; npm audit fix ; cd ..
> npm install ; npm audit fix

Build React-Admin
> cd admin ; npm run build ; cd ..

Run like this...
> npm run dev
