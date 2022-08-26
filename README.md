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

Invoices PDFs are generated in /schedule-data-service/invoices</br>
</br>
</br>
</br>
Initial setup for running with Docker while having db persistency and not be bothered by git on changed database file ever.

Create a directory named 'schemademo-database' one level above this project's main directory...<br>
`> mkdir ../schemademo-database`</br>
</br>
...and copy the database file to the new directory.</br>
`> cp schedule-data-service/database/nodehill_schedule.db ../schemademo-database/`</br>
</br>
Run in Docker with</br>
`> docker compose -p devops21-agile1 up -d`</br>
</br>
Tear down the services with</br>
`> docker compose -p devops21-agile1 down`</br>
