var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");
const passport = require("passport");
/* GET users listing. */

router.get("/login", (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    res.send({ status: "success", text: "user already logged in" });
  } else {
    res.send("we don not have any user");
  }
});
router.post("/login", function (req, res, next) {
  console.log("got a request ", req.user);
  if (req.user) {
    res.send({
      status: "success",
      text: "user already logged in",
      user: req.user,
    });
  } else {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        res.send("there was an error");
      }
      if (user) {
        console.log("user found and authenticated");
        console.log("use is ", user);
        req.login(user, (err) => {
          if (err) {
            return next(err);
          }
          res.send({
            status: "success",
            text: "user already logged in",
            user: req.user,
          });
        });
      } else {
        res.send({ status: "failure", text: "User was not found!" });
      }
    })(req, res, next);
  }
});

// logout the current user
router.get("/logout", (req, res, next) => {
  if (!req.user) {
    res.send("no user has logged in");
  } else {
    req.logout((err) => {
      if (err) {
        res.send("some error hapened");
      }
    });
    res.send({
      status: "success",
      text: "successfully logged out check the status",
    });
  }
});

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/",
//     failureMessage: true,
//   }),
//   function (req, res) {
//     res.send("/~" + req.user.username);
//   }
// );

// here the get req from register
router.get("/signup", function (req, res, next) {
  res.render("register", { title: "Register" });
  // res.send("respond with a resource");
});

// hear the post request for login
router.post("/signin", (req, res, next) => {
  if (req.user) {
    res.send({ status: "success", text: "user already logged in" });
  } else {
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
  }
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

// let delete user if it has admin

router.get("/delete/:id", (req, res, next) => {
  if (req.user) {
    var id = req.params.id;
    var sql = `DELETE FROM users WHERE user_id=${id}`;
    database.query(sql, (err, docs) => {
      if (err) {
        console.log(err);
        res.send({ status: "failure", msg: "Database error" });
      } else {
        console.log(docs);
        res.status(200).send({
          status: "failed",
          text: "User was deleted successfully",
        });
      }
    });
  } else {
    res.send({ status: "failure", msg: "Autherazation Error" });
  }
});

//get all the checkers
router.get("/all/checker", (req, res, next) => {
  if (req.user) {
    // var sql = `SELECT * FROM users WHERE role='checker' or role='admin'`;
    var sql = `SELECT * FROM users WHERE role='checker';`;
    database.query(sql, (err, docs) => {
      if (err) {
        res.send({ status: "failure", msg: "Database error" });
      } else {
        var arr = docs.rows.map((x) => x.username);
        console.log("array create", arr);
        res.send({ status: "success", data: arr });
      }
    });
  } else {
    res.send({ status: "failure", msg: "Autherazation Error" });
  }
});

module.exports = router;
