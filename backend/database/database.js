var mysql = require("mysql");
var database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "formsnode",
});

database.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

module.exports = database;
