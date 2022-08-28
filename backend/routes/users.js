var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");
const passport = require("passport");
/* GET users listing. */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/index",
  }),
  function (req, res, next) {
    console.log("got a request ", req.user);
    // if (req.user) {
    //   res.render("index", { title: "Login" });
    // } else {
    //   req.body.username = "test@123";
    //   req.body.password = "test";
    //   // passport.authenticate("local", function (err, user, info) {
    //   passport.authenticate("local", function (err, user, info) {
    //     console.log("into passport");
    //     if (err) {
    //       console.log(err);
    //       return res.status(401).json(err);
    //     }
    //     if (user) {
    //       console.log("user found and authenticated");
    //       console.log("user is ", user);
    //       req.login(user, function (err) {
    //         if (err) {
    //           console.log(err);
    //         }
    //         console.log("req username" + req.user);
    //         // const user = {
    //         //   name: req.user.name,
    //         //   username: req.user.email,
    //         //   email: req.user.email,
    //         //   id: req.user._id,
    //         //   timeStamp: Date.now(),
    //         // };
    //         return res.send(user);
    //       });
    //     } else {
    //       res.status(401).json(info);
    //     }
    //   });
    // }
  }
);

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
router.post("/register", (req, res, next) => {
  console.log(req.body);
  const { username, password, email, role } = req.body;
  console.log(username, password, email, role);
  if (username == "" || password == "" || role == "" || email == "") {
    res.status(500).send({ status: "failure", text: "details are missing" });
  } else {
    var sql = `SELECT username FROM users WHERE email='${req.body.email}' OR username='${req.body.username}';`;

    database.query(sql, (err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send({ status: "failure", text: "server side error" });
      } else {
        console.log(docs);
        if (docs.rowCount > 0) {
          res.status(200).send({ status: "failed", text: "User alredy exist" });
        } else {
          // create a new user
          var sql1 = `INSERT INTO users (username,password,email,role,created_on) VALUES ('${email}','${password}','${email}','${role}',NOW());`;
          database.query(sql1, (err, docs) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ status: "failure", text: "server side error" });
            } else {
              console.log(docs);
              res.status(200).send({
                status: "success",
                text: "User was added to the database",
              });
            }
          });
        }
      }
    });
  }

  // var sql = `INSERT INTO allusers (email,password) VALUES ('${email}','${password}');`;
  // database.query(sql, (err, results) => {
  //   if (err) throw err;
  //   console.log("record listed");
  //   req.send("successData added successfully!");
  // });
  // console.log("In Signup data", req.body);
  // res.send("data recived successfully");
});
// get all the users from the database
router.get("/all", (req, res, next) => {
  var sql = `select * from users;`;
  database.query(sql, (err, docs) => {
    if (err) {
      console.log(err);
      res.send({ status: "failure", msg: "Database error" });
    } else {
      console.log(docs);
      res.status(200).send({ status: "success", data: docs.rows });
    }
  });
});

module.exports = router;
