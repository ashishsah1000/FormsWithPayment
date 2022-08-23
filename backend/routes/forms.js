var express = require("express");
var router = express.Router();
var database = require("../database/pgdatabase");

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
  var email = "designer@gmail.com";
  var createdId = "";
  console.log("here in forms", req.body);
  var sql = `INSERT INTO allforms (title,description,email,forms,createon) VALUES ('${
    req.body.title
  }','${req.body.description}','${email}','${JSON.stringify(
    req.body.form
  )}',NOW());`;
  database.query(sql, (err, results) => {
    if (err) {
      throw err;
      res.status(404).send({ data: "error", text: "some error happened" });
    } else {
      createdId = results.rowCount;
      console.log("send via sql after inserting", results);
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
  console.log(req.body);

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
      console.log(err);
      res.send("error");
    } else {
      console.log("fetched data", doc.rows);
      res.send(doc.rows);
    }
  });
});
// modify the existing form

router.post("/edit/save/:id", (req, res, next) => {
  console.log(req.body);
  const id = req.params.id;
  var sql = `UPDATE allforms SET forms = '${JSON.stringify(
    req.body
  )}' WHERE id=${id};`;
  database.query(sql, (err, doc) => {
    if (err) {
      console.log(err);
      res.send({ status: "error" });
    } else {
      console.log("fetched data", doc);
      res.send({ status: "success", data: doc });
    }
  });
});

// get all the forms

router.get("/all", (req, res, next) => {
  //this will be in edit mode
  // const email = req.params.id;
  const email = "designer@gmail.com";
  var sql = `SELECT * FROM allforms WHERE email='${email}';`;
  // createConnection();
  database.query(sql, (err, doc) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log("fetched data", doc);
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
      console.log(err);
      res.send("error from database");
    } else {
      console.log("deleted the", id);
      res.send("success");
    }
  });
});

// collecting the response from the user
router.post("/submit/response", function (req, res, next) {
  console.log(req.body);
  var email = req.body.email;
  var userid = 100; // todo it has to be user login id
  var formid = parseInt(req.body.formid);
  var sql = `UPDATE formresponse SET forms ='${JSON.stringify(
    req.body.form
  )}' WHERE email='${email}';`;
  database.query(sql, (err, results) => {
    console.log("Executing querry");
    if (err) {
      console.log("some error", err);
      res.send({ data: "error", text: "some error happened" });
    } else {
      console.log(results);
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
      console.log(err);
      res.send("error");
    } else {
      console.log("fetched data", doc);
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
      console.log(err);
      res.send("error");
    } else {
      console.log("fetched data", doc.rows);
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
      console.log(err);
      res.send("error from database");
    } else {
      console.log("deleted the", id);
      res.send("success");
    }
  });
});

//
//
//
// this will be the response on form on other users

router.post("/collect/response/:id", function (req, res, next) {
  console.log("from collect response", req.body);
  var id = req.params.id;
  var sql = `SELECT * FROM formresponse WHERE formid = '${id}' AND email= '${req.body.username}';`;
  database.query(sql, (err, doc) => {
    if (err) {
      console.log(err);
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
          console.log("Executing 2nd  querry");
          if (err) {
            console.log("some error", err);
            res.send({ data: "error", text: "some error happened" });
          } else {
            console.log(results);
            res.send({
              status: "success",
              text: "Username was added succesfully",
            });
          }
        });
      } else {
        console.log("fetched data", doc.rows);
        res.send(doc.rows[0]);
      }
    }
  });
  //   add index to the form and save the data
});

module.exports = router;
