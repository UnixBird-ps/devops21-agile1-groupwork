
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  server.post(
    '/data/classes',
    function postClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      let sql = "INSERT INTO classes";
      sql += ' (' + Object.keys( record ).map( k => k ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( k => `@${k}` ) + ')';
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


  // komplettera uppgifter för klass
  server.put(
    '/data/classes/:id',
    function putClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      let sql = "UPDATE classes SET ";
      // Remove the id prop because we don't want to update it
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
