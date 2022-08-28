
module.exports = function(server, db)
{


  // komplettera uppgifter för klass
  server.put('/data/schools/:id', (request, response) =>
    {
      let s = request.body
      let result
      try
      {
        result = db.prepare(
          'UPDATE schools SET name = ?, shortName = ? WHERE id = ?'
        ).run([ s.name, s.shortName, s.id])
      }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


}
