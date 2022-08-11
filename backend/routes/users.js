var express = require("express");
var router = express.Router();
var database = require("../database/database");
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
  res.send("Got the login data");
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
