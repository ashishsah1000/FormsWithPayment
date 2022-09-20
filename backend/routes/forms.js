var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");

// connect to database
const createConnection = () => {
  database.connect((err) => {
    if (err) console.log(err);
    else console.log("connected");
  });
};
// disconect to database
const disconnect = () => {
  database.end();
};

/* . */
router.get("/", function (req, res, next) {
  //   res.render("index", { title: "Express" });
  res.send("recive the form data");
});
/* GET home page. */
router.post("/create", function (req, res, next) {
  // start saving data into form
  createConnection();
  var email = req.user.email;
  var createdId = "";
  var sql = `INSERT INTO allforms (title,description,email,forms,createon) VALUES ('${
    req.body.title
  }','${req.body.description}','${email}','${JSON.stringify(
    req.body.form
  )}',NOW()) RETURNING id;`;
  database.query(sql, (err, results) => {
    if (err) {
      throw err;
      res.status(404).send({ data: "error", text: "some error happened" });
    } else {
      createdId = results.rows[0].id; 
      // console.log(results)
    }
    res.status(200).send({
      status: "success",
      text: "added to forms",
      id: createdId,
      data: req.body,
    });
  });
});

/* GET home page. */
router.post("/create", function (req, res, next) {
  //   add index to the form and save the data
  res.send("recive the form data");
});

// get a specif form data

router.get("/edit/:id", (req, res, next) => {
  // get the specific id form request
  //this will be in edit mode
  const id = req.params.id;
  var sql = `SELECT * FROM allforms WHERE id=${id};`;
  database.query(sql, (err, doc) => {
    if (err) {
      res.send("error");
    } else {
      res.send(doc.rows);
    }
  });
});
// modify the existing form

router.post("/edit/save/:id", (req, res, next) => {
  const id = req.params.id;
  var sql = `UPDATE allforms SET forms = '${JSON.stringify(
    req.body.data
  )}',description='${req.body.description}',title='${
    req.body.title
  }' WHERE id=${id};`;
  database.query(sql, (err, doc) => {
    if (err) {
      res.send({ status: "error" });
    } else {
      res.send({ status: "success", data: doc });
    }
  });
});

// update publish
router.post("/publish", (req, res, next) => {
  if (req.user) {
    const id = req.body.id;
    const approver = req.body.approvers;
    var sql = `UPDATE allforms SET publish = 'pending', appointed_to='${approver}' WHERE id=${id};`;
    database.query(sql, (err, doc) => {
      if (err) {
        res.send({ status: "error", text: "some database error happened" });
      } else {
        res.send({ status: "success" });
      }
    });
  } else {
    res.status(400).send({ status: "failed", text: "user was unathorized" });
  }
});

// get all forms if they are pending for a user
router.get("/all/approve", (req, res, next) => {
  if (req.user) {
    // has to be checker and admin
    if (req.user.role == "admin" || req.user.role == "checker") {
      var sql = `SELECT * from allforms WHERE publish='pending';`;
      database.query(sql, (err, doc) => {
        if (err) {
          res.send({ status: "error", text: "some database error happened" });
        } else {
          res.send({ status: "success", data: doc.rows });
        }
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", text: "user was Checker or admin" });
    }
  } else {
    res.status(400).send({ status: "failed", text: "user was unathorized" });
  }
});
// get all forms that are approved so that user can publish and get response on the forms
router.get("/all/approved", (req, res, next) => {
  if (req.user) {
    // has to be publisher and admin
    console.log("req user is",req.user)
    if (req.user.role == "admin" || req.user.role == "publisher") {
      var sql = `SELECT * from allforms WHERE publish='approved';`;
      database.query(sql, (err, doc) => {
        if (err) {
          res.send({ status: "error", text: "some database error happened" });
        } else {
          console.log(doc.rows)
          res.send({ status: "success", data: doc.rows });
        }
      });
    } else {
      res
        .status(400)
        .send({ status: "failed", text: "user was Checker or admin" });
    }
  } else {
    res.status(400).send({ status: "failed", text: "user was unathorized" });
  }
});

// approve a specfic form if has the approver authority
router.post("/approve/:id", (req, res, next) => {
  if (req.user) {
    if (req.user.role == "admin" || req.user.role == "checker") {
      const id = req.body.id;
      var sql = `UPDATE allforms SET publish = 'approved' WHERE id=${id};`;
      database.query(sql, (err, doc) => {
        if (err) {
          res.send({ status: "error", text: "some database error happened" });
        } else {
          res.send({ status: "success" });
        }
      });
    } else {
      res.status(400).send({ status: "failed", text: "user was unathorized" });
    }
  } else {
    res.status(400).send({ status: "failed", text: "user was unathorized" });
  }
});
// approve a specfic form if has the approver authority
router.post("/deapprove/:id", (req, res, next) => {
  console.log("reacived data",req.body)
  if (req.user) {
    if (req.user.role == "admin" || req.user.role == "checker") {
      if(req.body.reason.length>0){
        const id = req.body.id;
        console.log("we are reciving this id", id);
        var sql = `UPDATE allforms SET publish = 'deapproved',reason = '${req.body.reason}' WHERE id=${id};`;
        database.query(sql, (err, doc) => {
          if (err) {
            console.log(err);
            res.send({ status: "error", text: "some database error happened" });
          } else {
            console.log("fetched data", doc);
            res.send({ status: "success" });
          }
        });
      }
      else {
        res.status(300).send({ status: "failed", text: "reason was not found" });
      }
    
    } else {
      res.status(400).send({ status: "failed", text: "user was unathorized" });
    }
  } else {
    res.status(400).send({ status: "failed", text: "user was unathorized" });
  }
});

// get all the forms

router.get("/all", (req, res, next) => {
  //this will be in edit mode
  // const email = req.params.id;
  const email = req.user.email;
  var sql = `SELECT * FROM allforms WHERE email='${email}';`;
  // createConnection();
  database.query(sql, (err, doc) => {
    if (err) {
      res.send("error");
    } else {
      res.send(doc.rows);
    }
  });
});

// delete a form with specific id
router.get("/delete/:id", (req, res, next) => {
  // this will drop  row from database
  var id = req.params.id;
  var sql = `DELETE FROM allforms WHERE id=${id}`;
  database.query(sql, [], (err, doc) => {
    if (err) {
      res.send("error from database");
    } else {
      res.send("success");
    }
  });
});

// collecting the response from the user
router.post("/submit/response", function (req, res, next) {
  var email = req.body.email;
  var userid = 100; // todo it has to be user login id
  var formid = parseInt(req.body.formid);
  var sql = `UPDATE formresponse SET forms ='${JSON.stringify(
    req.body.form
  )}' WHERE email='${email}';`;
  database.query(sql, (err, results) => {
    if (err) {
      res.send({ data: "error", text: "some error happened" });
    } else {
      res.send({
        status: "success",
        text: "Response was added succesfully",
      });
    }
  });
});
// // collecting the response from the user
// router.post("/submit/response", function (req, res, next) {
//   // start saving data into form
//   // createConnection();
//   var email = "designer@gmail.com";
//   var userid = 100; // todo it has to be user login id
//   var formid = parseInt(req.body.formid);
//   var sql = `INSERT INTO formresponse (formid,userid,email,forms,createon) VALUES ('${formid}','${userid}','${email}','${JSON.stringify(
//     req.body.form
//   )}',NOW());`;
//   database.query(sql, (err, results) => {
//     console.log("Executing querry");
//     if (err) {
//       console.log("some error", err);
//       res.send({ data: "error", text: "some error happened" });
//     } else {
//       console.log(results);
//       res.send({
//         status: "success",
//         text: "Response was added succesfully",
//       });
//     }
//   });
// });

// get all response on specific id
router.get("/response/all/:id", (req, res, next) => {
  var id = req.params.id;
  // const email = "designer@gmail.com";
  // var sql = `SELECT * FROM formresponse WHERE email='${email}' AND formid = '${id}';`;
  var sql = `SELECT * FROM formresponse WHERE formid = '${id}';`;
  database.query(sql, (err, doc) => {
    if (err) {
      res.send("error");
    } else {
      res.send(doc.rows);
    }
  });
});

// get a specifc response
router.get("/response/:id", (req, res, next) => {
  // get the specific id form request
  //this will be in edit mode
  const id = req.params.id;
  var sql = `SELECT * FROM formresponse WHERE id = '${id}';`;
  database.query(sql, (err, doc) => {
    if (err) {
      res.send("error");
    } else {
      res.send(doc.rows);
    }
  });
});
// delete a form with specific id
router.get("/response/delete/:id", (req, res, next) => {
  // this will drop  row from database
  var id = req.params.id;
  var sql = `DELETE FROM formresponse WHERE id=${id}`;
  database.query(sql, [], (err, doc) => {
    if (err) {
      res.send("error from database");
    } else {
      res.send("success");
    }
  });
});

//
//
//
// this will be the response on form on other users

router.post("/collect/response/:id", function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM formresponse WHERE formid = '${id}' AND email= '${req.body.username}';`;
  database.query(sql, (err, doc) => {
    if (err) {
      res.send("error");
    } else {
      if (doc.rows.length == 0) {
        // start saving data into form
        // createConnection();
        var email = req.body.username;
        var userid = 100; // todo it has to be user login id
        var formid = parseInt(req.body.formid);
        var sql2 = `INSERT INTO formresponse (formid,userid,email,forms,createon) VALUES ('${formid}','${userid}','${email}','${JSON.stringify(
          []
        )}',NOW());`;
        database.query(sql2, (err, results) => {
          if (err) {
            res.send({ data: "error", text: "some error happened" });
          } else {
            res.send({
              status: "success",
              text: "Username was added succesfully",
            });
          }
        });
      } else {
        res.send(doc.rows[0]);
      }
    }
  });
  //   add index to the form and save the data
});

module.exports = router;
