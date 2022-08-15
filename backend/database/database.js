var mysql = require("mysql");
// var sql = require("mssql");
var database = mysql.createConnection({
  user: "postgres",
  host: "localhost",
  database: "formsnode",
  password: "admin",
  port: 5001,
});

database.connect(function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

// const database = {
//   user: "admin",
//   password: "admin",
//   database: "formsnode",
//   server: "localhost",
//   port: "1443",
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000,
//   },
//   options: {
//     // encrypt: true, // for azure
//     trustServerCertificate: true, // change to true for local dev / self-signed certs
//   },
// };
// async () => {
//   try {
//     // make sure that any items are correctly URL encoded in the connection string
//     await sql.connect(database).then((res) => {
//       console.log(res);
//     });
//     // const result = await sql.query`select * from mytable where id = ${value}`;
//     console.dir(result);
//   } catch (err) {
//     // ... error checks
//   }
// };

module.exports = database;
