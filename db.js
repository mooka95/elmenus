const mysql= require('mysql');
const {host,user,database}=require('./config');
var util = require('util');
const pool = mysql.createPool({
  connectionLimit:10,
  host     : host,
  user     : user,
  database : database
});

pool.getConnection((err, connection) => {
  if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('Database connection was closed.')
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database has too many connections.')
      }
      if (err.code === 'ECONNREFUSED') {
          console.error('Database connection was refused.')
      }
  }
  
  if (connection) connection.release()
  
   return
   })

   pool.query = util.promisify(pool.query);
module.exports=pool;