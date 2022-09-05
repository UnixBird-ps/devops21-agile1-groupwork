module.exports = function(host){
    return [
        {
            route:"/data",
            methods: ["GET"],
            description:"This route: The API documentation"
        },
        {
            route:"/data/calendar/:from/:to",
            methods: ["GET"],
            description:"List calendar between :from and :to (including holidays)",
            link: host  + "/data/calendar/2022-01-01/2022-03-30"
        },
        {
            route:"/data/populate-swedish-holidays/:from/:to'",
            methods: ["GET"],
            description:"Populate database with holidays between :from and :to. (Warning, destructive, clears all previously loaded holidays from database)",
            link: host  + "/data/populate-swedish-holidays/2020-01-01/2028–12-31"
        },
        {
            route:"/data/login",
            methods: ["POST","GET","DELETE"],
            description:"Login user, get current logged in user, logout"
        },
        {
            route:"/data/teachers",
            methods: ["GET","POST","PUT"],
            description:"Get list of teachers, create teacher, add/change teacher details",
            link: host  + "/data/teachers"
        },
        {
            route:"/data/teachers/password",
            methods: ["DELETE","PATCH"],
            description:"Clear old password, add new password",
            link: host  + "/data/teachers/password"
        },
        {
            route:"/data/classes",
            methods: ["GET"],
            description:"Get list of classes",
            link: host  + "/data/classes"
        },
        {
            route:"/data/classes_view",
            methods: ["GET"],
            description:"Get enriched list of classes",
            link: host  + "/data/classes_view"
        },
        {
            route:"/data/schools",
            methods: ["GET"],
            description:"Get list of schools",
            link: host  + "/data/schools"
        },
        {
            route:"/data/courses",
            methods: ["GET"],
            description:"Get list of courses",
            link: host  + "/data/courses"
        },
        {
            route:"/data/invoices",
            methods: ["POST","GET"],
            body: {                
                startDate: "Date (required)",
                endDate: "Date (required)",
                school: "INT id (required)",
                class: "INT id (optional)",
                course: "INT id (optional)",
                invoiceDate: "Date (optional)",
                paymentDueDate: "Date (optional)",
                yourRef: "String (optional)",
                ourRef: "String (optional)"
            },
            description:"Generate and get invoices",
            link: host  + "/data/invoices"
        }
    ]
}