
module.exports = function(server, db)
{

  // registrera en ny skola
  server.post('/data/schools', (request, response) =>
    {
      let school = request.body
      let result
      try
      {
        result = db.prepare('INSERT INTO schools (name, shortName) VALUES(?,?)').run([school.name, school.shortName]) }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


  // komplettera uppgifter för skola
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
