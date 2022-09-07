// courses.js
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  //SqliteError: table courses has 11 columns but 10 values were supplied
  // When had @id in VALUES
  server.post('/data/courses', (request, response) =>
    {
      debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      console.log( 'before:\n', record );
      let sql = "INSERT INTO courses";
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      console.log( 'after:\n', record );
      console.log( sql );
      let result;
      try
      {
        const stmt = db.prepare( sql );
        result = stmt.run( record );
      }
      catch(e)
      {
        console.error(e);
      }
      response.json(result)
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
      debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      console.log( 'before:\n', record );
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      let sql = "UPDATE courses SET ";
      sql += Object.keys( record ).filter( k => k != 'id' ).map( k => `${k}=@${k}` );
      sql += " WHERE id=@id";
      console.log( 'after:\n', record );
      console.log( sql );
      const stmt = db.prepare( sql );
      let result;
      try
      {
        const stmt = db.prepare( sql );
        result = stmt.run( record );
      }
      catch(e)
      {
        console.error(e);
      }
      response.json(result)
    }
  )


}
