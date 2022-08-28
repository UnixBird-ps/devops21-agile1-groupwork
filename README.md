# devops21-agile1-groupwork

# nodehill-schedule
# version 3.0
Scheduling & invoicing
<br>
<br>
Install all dependencies...
```bash
cd admin ; npm install ; npm audit fix ; cd ..
cd schedule-data-service ; npm install ; npm audit fix ; cd ..
npm install ; npm audit fix
```

Build React-Admin...
```bash
cd admin ; npm run build ; cd ..
```

Run like this...
```bash
npm run dev
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
