
module.exports = function(server, db)
{


server.get('/data/courses/:from/:to', (request, response) =>
  {
    let query = "SELECT * FROM courses WHERE startDate >= @startDate AND endDate <= @endDate"
    let result = db.prepare(query).all({startDate: request.params.from, endDate: request.params.to})
    response.json(result)
  }
)

server.put('/data/courses/:id', (request, response) =>
  {
    let course = request.body
    let result
    try
    {
      result = db.prepare(
      'UPDATE courses SET name = ?, shortName = ?, class = ?, points = ?, startDate = ?, endDate = ?, plan = ?, invoiceItem = ?, hoursPerDay = ?, hide = ? WHERE id = ?'
      ).run([course.name, course.shortName, course.class, course.points, course.startDate, course.endDate, course.plan, course.invoiceItem, course.hoursPerDay, course.hide, course.id])
    }
    catch(e)
    {
      console.error(e)
    }
    response.json(result)
  }
)

server.post('/data/courses', (request, response) =>
  {
    let query = "INSERT INTO courses VALUES(@id, @name, @shortName, @class, @points, @startDate, @endDate, @plan, @invoiceItem, @hoursPerDay)"
    let statement = db.prepare(query)
    let result = statement.run(request.body)
    response.json(result)
  }
)


}
