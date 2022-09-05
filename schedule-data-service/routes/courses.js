
const { debugMsg } = require( "../debug-funcs.js" );


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
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      let sql = "UPDATE courses SET ";
      sql += Object.keys( record ).filter( k => k != 'id' ).map( k => `${k}=@${k}` );
      sql += " WHERE id=@id";
      // console.log( 'after:\n', record );
      // console.log( sql );
      const stmt = db.prepare( sql );
      let result = stmt.run( record );
      response.json(result);
    }
  )


}
