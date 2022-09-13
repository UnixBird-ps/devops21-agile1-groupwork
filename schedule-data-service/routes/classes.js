// classes.js
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  server.post(
    '/data/classes',
    function postClass(request, response)
    {
      debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null && entry[1] != '' ) );
      let sql = "INSERT INTO classes";
      // sql += ' (' + Object.entries( record ).filter( entry => entry[1] != null && entry[1] != '' ).map( entry => entry[ 0 ] ) + ')';
      // sql += ' VALUES(' + Object.entries( record ).filter( entry => entry[1] != null && entry[1] != '' ).map( entry => `@${entry[ 0 ]}` ) + ')';
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      console.log( 'before:\n', record );
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


  // komplettera uppgifter för klass
  server.put(
    '/data/classes/:id',
    function putClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      let sql = "UPDATE classes SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=:id";
      // console.log( 'before:\n', record );
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


}
