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
  var sql = `INSERT INTO allforms (email,forms,createon) VALUES ('${email}','${JSON.stringify(
    req.body
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
  var sql = `SELECT forms FROM allforms WHERE id=${id};`;
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
  var sql = `SELECT id,forms,createon FROM allforms WHERE email='${email}';`;
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

module.exports = router;
