# devops21-agile1-groupwork

# nodehill-schedule
# version 3.0
Scheduling & invoicing
<br>
<br>
Install all dependencies...
```bash
cd admin && npm install && npm audit fix && cd ..
cd schedule-data-service && npm install && npm audit fix && cd ..
npm install && npm audit fix
```

Build React-Admin...
```bash
cd admin && npm run build && cd ..
```

Make a copy of the database file...
```bash
cd schedule-data-service/database && cp nodehill_schedule_org.db nodehill_schedule.db && cd ../..
```

Run like this...
```bash
npm run dev
```

To rebuild and restart, do this...  
CTRL+C twise in the terminal, then...
```bash
clear && cd admin && npm run build && cd .. && npm run dev
```

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

Invoices PDFs are generated in /schedule-data-service/invoices
