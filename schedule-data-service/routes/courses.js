
module.exports = function(server, db)
{


  //SqliteError: table courses has 11 columns but 10 values were supplied
  // When had @id in VALUES
  server.post('/data/courses', (request, response) =>
    {
      let c = request.body;
      let result = db.prepare(
        "INSERT INTO courses (name, shortName, class, points, startDate, endDate, plan, invoiceItem, hoursPerDay, hide) VALUES(?,?,?,?,?,?,?,?,?,?)"
      ).run([c.name, c.shortName, c.class, c.points, c.startDate, c.endDate, c.plan, c.invoiceItem, c.hoursPerDay, c.hide]);
      response.json(result);
    }
  )


  server.get('/data/courses/:from/:to', (request, response) =>
    {
      let query = "SELECT * FROM courses WHERE startDate >= @startDate AND endDate <= @endDate"
      let result = db.prepare(query).all({startDate: request.params.from, endDate: request.params.to})
      response.json(result)
    }
  )


  server.put('/data/courses/:id', (request, response) =>
    {
      let c = request.body
      let result
      try
      {
        result = db.prepare(
          'UPDATE courses SET name = ?, shortName = ?, class = ?, points = ?, startDate = ?, endDate = ?, plan = ?, invoiceItem = ?, hoursPerDay = ?, hide = ? WHERE id = ?'
        ).run([c.name, c.shortName, c.class, c.points, c.startDate, c.endDate, c.plan, c.invoiceItem, c.hoursPerDay, c.hide, c.id])
      }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


}
