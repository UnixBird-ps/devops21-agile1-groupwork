
module.exports = function(server, db)
{

  server.post('/data/classes', (request, response) =>
    {
      let c = request.body;
      let result = db.prepare(
        "INSERT INTO classes (name, shortName, school, blog, hide, defaultStartTime, defaultEndTime, defaultInvoiceItem, defaultHoursPerDay ) VALUES(?,?,?,?,?,?,?,?,?)"
      ).run([c.name, c.shortName, c.school, c.blog, c.hide, c.defaultStartTime, c.defaultEndTime, c.defaultInvoiceItem, c.defaultHoursPerDay]);
      response.json(result)
    }
  )


  // komplettera uppgifter för klass
  server.put('/data/classes/:id', (request, response) =>
    {
      let c = request.body
      let result
      try
      {
        result = db.prepare(
          'UPDATE classes SET name = ?, shortName = ?, school = ?, blog = ?, hide = ?, defaultStartTime = ?, defaultEndTime = ?, defaultInvoiceItem = ?, defaultHoursPerDay = ? WHERE id = ?'
        ).run([c.name, c.shortName, c.school, c.blog, c.hide, c.defaultStartTime, c.defaultEndTime, c.defaultInvoiceItem, c.defaultHoursPerDay, c.id])
      }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


}
