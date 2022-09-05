let database = null;

module.exports = function db(){
  if(!database){
    database = require('better-sqlite3')('./database/nodehill_schedule.db', {fileMustExist: true /*, verbose: console.log*/ })
  }
  return database
}