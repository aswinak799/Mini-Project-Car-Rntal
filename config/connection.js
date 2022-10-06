const mysql = require("mysql");
// Create connection


const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: "rental_system"

});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("MySql Connected successfully");
  });
  
  
  module.exports = db;