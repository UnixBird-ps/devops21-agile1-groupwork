
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
  server.put(
    '/data/schools/:id',
    function updateSchool( request, response )
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      let sql = "UPDATE schools SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=:id";
      let result;
      try
      {
        // result = db.prepare( 'UPDATE schools SET name = @name, shortName = @shortName WHERE id = :id' ).run( record );
        const stmt = db.prepare( sql );
        result = stmt.run( record );
      }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


}
