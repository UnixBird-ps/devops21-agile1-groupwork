// schools.js
const { debugMsg } = require( "../debug-funcs.js" );

module.exports = function(server, db)
{

  // registrera en ny skola
  server.post(
    '/data/schools',
    function postSchool( request, response )
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      let sql = 'INSERT INTO schools';
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // console.log( sql );
      let result;
      try
      {
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
      // console.log( sql );
      let result;
      try
      {
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
