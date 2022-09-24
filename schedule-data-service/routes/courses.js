// courses.js
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  server.post(
    '/data/courses',
    function postCourse(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      let sql = "INSERT INTO courses";
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // Convert the 'class' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'class' ) ) record.class = record.class == '' ? null : record.class;
      // Convert the 'invoiceItem' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'invoiceItem' ) ) record.invoiceItem = record.invoiceItem == '' ? null : record.invoiceItem;
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      // console.log( 'after:\n', record );
      // console.log( sql );
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


  server.put(
    '/data/courses/:id',
    function putCourse(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      let sql = "UPDATE courses SET ";
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=@id";
      // console.log( sql );
      // Convert the 'class' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'class' ) ) record.class = record.class == '' ? null : record.class;
      // Convert the 'invoiceItem' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'invoiceItem' ) ) record.invoiceItem = record.invoiceItem == '' ? null : record.invoiceItem;
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      // console.log( 'after:\n', record );
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
