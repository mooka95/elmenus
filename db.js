const mysql= require('mysql');
const {host,user,database}=require('./config');
const connection = mysql.createConnection({
  host     : host,
  user     : user,
  database : database
});

connection.connect(function(err) {
    if(err) {
      throw "Error in connection";
    }
    });
module.exports=connection;