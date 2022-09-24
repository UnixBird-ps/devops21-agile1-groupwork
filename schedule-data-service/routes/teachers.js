// teachers.js
const encrypt = require('../modules/encrypt.js')
const { debugMsg } = require( "../debug-funcs.js" );


module.exports = function(server, db)
{


  // registrera en ny lärare
  server.post(
    '/data/teachers',
    function postTeacher(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) );// && entry[1] != ''
      let sql = 'INSERT INTO teachers';
      sql += ' (' + Object.keys( record ).map( key => key ) + ')';
      sql += ' VALUES(' + Object.keys( record ).map( key => `@${key}` ) + ')';
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) ) record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      // Convert the 'roles' prop from an array to a string (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'roles' ) )
      {
        if ( Array.isArray( record.roles ) ) record.roles = record.roles.join( ',' );
        if ( record.roles == null ) record.roles = '';
      }
      record.password = encrypt( record.password );
      // console.log( 'after:\n', record );
      // console.log( sql );
      let result;
      try
      {
        const stmt = db.prepare( sql );
        result = stmt.run( record ); //[ record.email, encryptedPassword ]
      }
      catch(e)
      {
        console.error(e);
      }
      response.json(result);
    }
  )


  // komplettera profil för användare
  server.put(
    '/data/teachers',
    function putTeacher(request, response)
    {
      let user = request.body
      let result
      try
      {
        result = db.prepare(
          'UPDATE teachers SET firstname = ?, lastname = ?, initials = ?, phone = ?, color = ?, hide = ? WHERE email = ?'
        ).run([user.firstname, user.lastname, user.initials, user.phone, user.color, user.hide, user.email])
      }
      catch(e)
      {
        console.error(e)
      }
      response.json(result)
    }
  )


  // komplettera profil för användare
  server.put(
    '/data/teachers/:id',
    function putTeacher(request, response)
    {
      // debugMsg( `${request.method}: ${decodeURI( request.url )}` );
      let record = request.body;
      // console.log( 'before:\n', record );
      // Remove props with nulls and empty strings, let DB decide the value
      record = Object.fromEntries( Object.entries( record ).filter( entry => entry[1] != null ) ); // && entry[1] != ''
      let sql = "UPDATE teachers SET ";
      // Remove the id prop because we don't want to update it
      sql += Object.keys( record ).filter( key => key != 'id' ).map( key => `${key}=@${key}` );
      sql += " WHERE id=:id";
      // Convert the 'roles' prop from an array to a string (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'roles' ) )
      {
        if ( Array.isArray( record.roles ) ) record.roles = record.roles.join( ',' );
        if ( record.roles == null ) record.roles = '';
      }
      // Convert the 'hide' prop from a boolean to an integer (React-Admin -> DB)
      if ( Object.keys( record ).includes( 'hide' ) )
      {
        record.hide = ( record.hide == null || record.hide == false ) ? 0 : 1;
      }
      // console.log( 'after:\n', record );
      // console.log( sql );
      const stmt = db.prepare( sql );
      let result = stmt.run( record );
      response.json(result)
    }
  )

  // begär ändring av lösenord för användare
  server.delete(
    '/data/teachers/password',
    function resetPassword(request, response)
    {
      let user = request.body
      let result
      try{
        result = db.prepare('UPDATE teachers SET password = NULL WHERE email = ? AND hide = 0').run([user.email])
      }catch(e){
        console.error(e)
      }
      response.json(result)
    }
  )


  // ändra lösenord för användare
  server.patch(
    '/data/teachers/password',
    function updatePassword(request, response)
    {
      let user = request.body
      let encryptedPassword = encrypt(user.password)
      let result
      try{
        result = db.prepare('UPDATE teachers SET password = ? WHERE password IS NULL AND email = ?').run([encryptedPassword, user.email])
      }catch(e){
        console.error(e)
      }
      response.json(result)
    }
  )


}
