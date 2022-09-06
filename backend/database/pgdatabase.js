const { Pool, Client } = require("pg");

const database = new Client({
  user: "postgres",
  host: "localhost",
  database: "formsnode",
  password: "admin",
  port: 5432,
});
const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "formsnode",
  password: "admin",
  port: 5432,
});

database.connect((err) => {
  if (err) console.log(err);
  else console.log("connected");
});

module.exports = { database, pgPool };
