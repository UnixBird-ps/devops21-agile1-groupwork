
/**
Writes a debug message with caller's name and row number to screen
For example:
debugMsg( "myVal: ", "12.345", "\nThird" );
Will output:
DEBUG at: path-to-source/file.js:#:#
myVal: 12.345
Third
*/
function debugMsg( ...pMsg )
{
  console.log( "DEBUG at:", ( new Error() ).stack.split( ' at ' )[ 2 ].trim() );
  let lMsg = "";
  for ( let s of [ ...pMsg ] ) lMsg += typeof s == "string" ? s : JSON.stringify( s, null, 3 );
  console.log( lMsg );
}


// For Jest - check if we are in a Node.js environment
// if so export the class for Jest
if ( typeof module === 'object' && module.exports )
{
  module.exports = { debugMsg };
}
