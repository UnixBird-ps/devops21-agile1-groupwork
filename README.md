# devops21-agile1-groupwork

# nodehill-schedule
# version 3.0
Scheduling & invoicing
<br>
<br>

As a first step when setting up the project you will need to install all dependencies. You might not be prompted by the system to run npm audit fix everytime, but if you are please do so:

```bash
cd admin && npm install && npm audit fix && cd ..
cd schedule-data-service && npm install && npm audit fix && cd ..
npm install && npm audit fix
```

Next you will want to build the application (our admin dashboard built by utilising React-Admin) for production:

```bash
cd admin && npm run build && cd ..
```

We are working with version control, but to avoid unnecessary merge conflicts we don't wish to have our database as part of version control. To still have a functional database while working you need to follow these steps to make a copy of the database file (once) when you are setting up the project:

```bash
cd schedule-data-service/database && cp nodehill_schedule_org.db nodehill_schedule.db && cd ../..
```

To get the application up and running, please use this command:

```bash
npm run dev
```


To rebuild and restart, do this...  
CTRL+C twice in the terminal to stop the server, then...

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
