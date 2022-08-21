var express = require("express");
var router = express.Router();
var database = require("../database/pgdatabase");
/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log("got a request ");
  res.render("index", { title: "Login" });
  // res.send("respond with a resource");
});

// here the get req from register
router.get("/signup", function (req, res, next) {
  res.render("register", { title: "Register" });
  // res.send("respond with a resource");
});

// hear the post request for login
router.post("/signin", (req, res, next) => {
  console.log("In Signup data", req.body);
  var sql = `SELECT * FROM users WHERE email='${req.body.username}'`;
  database.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure", text: "Some server error!" });
    } else {
      console.log("password matching", results);
      // if(req.body.password==="")
      if (results.rowCount == 1) {
        if (req.body.password === results.rows[0].password) {
          res.send({ status: "success", text: "Successfully logged in!" });
        } else {
          res.send({ status: "failure", text: "Wrong password!" });
        }
      } else {
        res.send({ status: "failure", text: "User was not found!" });
      }
    }
  });
});

// hear the post request from signup
router.post("/signup", (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var sql = `INSERT INTO allusers (email,password) VALUES ('${email}','${password}');`;
  database.query(sql, (err, results) => {
    if (err) throw err;
    console.log("record listed");
    req.send("successData added successfully!");
  });
  console.log("In Signup data", req.body);
  res.send("You should be redirected");
});

module.exports = router;
