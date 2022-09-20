# General overview

The project aims to expand the "Nodehill-schedule"-system (a system for scheduling and invoicing at a education company) with a user interface for administrators.

# The Team

The team is working in accordance to SCRUM. The teammembers are:

- Fadel (nodeFadel)
- Katarina (katarina-pa)
- Mia (Entitet)
- Nazir (Naaziir)
- Norhaan (Norhaan-a)
- Pawel (UnixBird-ps)

When working remote we communicate as a team in a Discord-group. We keep track of the tasks in the project in this [Trello-board](https://trello.com/b/TSifMMXd/devops21-agile-1-groupwork). You can find additional working materials in our [Miro-workspace](https://miro.com/app/board/uXjVPc82tCk=/).

As the project is part of coursework for us as DevOps-students we strive to meet in person according to the schedule for the course [Agil-utveckling och projekt inom DevOps](https://devop.lms.nodehill.com/article/kursplanering-agil-utveckling-och-projekt-inom-devops-grund). Our goal is to have daily standups digitally through Discord on weekdays there are no lessons scheduled. 

# Getting started

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

# Branching

We are working in branches, where the:

**main** branch is for code that is ready to go live. After the first release the main branch will therefore represent the live version of the application.

**dev** branch is our default branch. In this branch you will find the version of the application that is under development.

While working with the code you will create a separate branch from the dev branch. Please give your branch a descriptive name such as feature-descriptive-name-of-feature or test-descriptive-name-of-test. If you are the only one working in the branch end the name with your initials.

The main and dev branches are protected. To be able to merge your work you need to submit a pull request.


# General information from the team at Nodehill about nodehill-schedule v. 3.0

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