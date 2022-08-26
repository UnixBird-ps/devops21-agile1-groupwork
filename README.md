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

Invoices PDFs are generated in /schedule-data-service/invoices



Initial setup for running with Docker while having db persistency and not be bothered by git on changed database file ever.

Create a directory named 'schemademo-database' one level above this project's main directory...
> mkdir ../schemademo-database

...and copy the database file to the new directory.
> cp schedule-data-service/database/nodehill_schedule.db ../schemademo-database/

Run in Docker with
> docker compose -p devops21-agile1 up -d

Tear down the services with
> docker compose -p devops21-agile1 down
