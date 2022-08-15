const { Pool, Client } = require("pg");

const database = new Client({
  user: "postgres",
  host: "localhost",
  database: "formsnode",
  password: "admin",
  port: 5001,
});

database.connect((err) => {
  if (err) console.log(err);
  else console.log("connected");
});

module.exports = database;
