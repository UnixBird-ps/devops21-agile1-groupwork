// invoiceitems.js
const { debugMsg } = require( "../debug-funcs.js" );

module.exports = function(server, db)
{

  // registrera en ny invoice item
  server.post(
    '/data/invoice_items',
    function postInvoiceItem( request, response )
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      // Build the SQL query
      let sql = 'INSERT INTO invoice_items';
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';              // Creates ( column1, column2...
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';  // Creates ( @param1, @param2...
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
        console.error(e)
      }
      response.json(result)
    }
  )


  // komplettera uppgifter för invoice item
  server.put(
    '/data/invoice_items/:id',
    function putInvoiceItem( request, response )
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      // Build the SQL query
      let sql = "UPDATE invoice_items SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` ); // Creates column1=@column1, column2=@column2...
      sql += " WHERE id=:id";
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
        console.error(e)
      }
      response.json(result)
    }
  )


}
