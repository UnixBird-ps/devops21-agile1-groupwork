
module.exports = function(server, db)
{

server.get('/data/courses/:from/:to', (req, res) =>
  {
    let query = "SELECT * FROM courses WHERE startDate >= @startDate AND endDate <= @endDate"
    let result = db.prepare(query).all({startDate: req.params.from, endDate: req.params.to})
    res.json(result)
  }
)

server.put('/data/courses/:id', (req, res) =>
  {
    let course = req.body
    let result
    try
    {
      result = db.prepare(
      'UPDATE courses SET name = ?, shortName = ?, class = ?, points = ?, startDate = ?, endDate = ?, plan = ?, invoiceItem = ?, hoursPerDay = ?, hide = ? WHERE id = ?'
      ).run([course.name, course.shortName, course.class, course.points, course.startDate, course.endDate, course.plan, course.invoiceItem, course.hoursPerDay, course.hide, req.params.id])
    }
    catch(e)
    {
      console.error(e)
    }
    res.json(result)
  }
)

server.post('/data/courses', (req, res) =>
  {
    let query = "INSERT INTO courses VALUES(@id, @name, @shortName, @class, @points, @startDate, @endDate, @plan, @invoiceItem, @hoursPerDay)"
    let statement = db.prepare(query)
    let result = statement.run(req.body)
    res.json(result)
  }
)


}
