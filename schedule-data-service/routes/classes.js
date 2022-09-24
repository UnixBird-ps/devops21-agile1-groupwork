// classes.js
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  // registrera en ny klass
  server.post(
    '/data/classes',
    function postClass(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      let sql = "INSERT INTO classes";
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // Convert the 'defaultInvoiceItem' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'defaultInvoiceItem' ) ) record.defaultInvoiceItem = record.defaultInvoiceItem == '' ? null : record.defaultInvoiceItem;
      // Convert the 'school' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'school' ) ) record.school = record.school == '' ? null : record.school;
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
      // console.log( 'before:', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != '' && ( entry[1] == true || entry[1] == false )
      let sql = "UPDATE classes SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=:id";
      // Convert the 'defaultInvoiceItem' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'defaultInvoiceItem' ) ) record.defaultInvoiceItem = record.defaultInvoiceItem == '' ? null : record.defaultInvoiceItem;
      // Convert the 'school' prop from an empty string to a null (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'school' ) ) record.school = record.school == '' ? null : record.school;
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = record.hide ? 1 : 0;
      // console.log( 'after:', record );
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
