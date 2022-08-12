var express = require("express");
var router = express.Router();
var database = require("../database/database");

/* . */
router.get("/", function (req, res, next) {
  //   res.render("index", { title: "Express" });
  res.send("recive the form data");
});
/* GET home page. */
router.post("/create", function (req, res, next) {
  // start saving data into form
  var email = "designer@gmail.com";

  console.log("here in forms", JSON.stringify(req.body));
  var sql = `INSERT INTO allforms (email,forms,createon) VALUES ('${email}','${JSON.stringify(
    req.body
  )}',NOW());`;
  database.query(sql, (err, results) => {
    if (err) {
      throw err;
      res.send("Some error happened");
    }
    console.log("record added to the forms database");
    res.send("successData added successfully!");
  });
});

/* GET home page. */
router.post("/create", function (req, res, next) {
  console.log(req.body);
  //   res.render("index", { title: "Express" });

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
      console.log("fetched data", doc);
      res.send(doc);
    }
  });
});

// get all the forms

router.get("/all", (req, res, next) => {
  //this will be in edit mode
  // const email = req.params.id;
  const email = "designer@gmail.com";
  var sql = `SELECT id,forms,createon FROM allforms WHERE email='${email}';`;
  database.query(sql, (err, doc) => {
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      console.log("fetched data", doc);
      res.send(doc);
    }
  });
});

// delete a form with specific id
router.get("/delete/:id", (req, res, next) => {
  // this will drop  row from database
  var id = req.params.id;
  var sql = `DELETE FROM allforms WHERE id=${id}`;
  database.query(sql, 1, (err, doc) => {
    if (err) {
      console.log(err);
      res.send("error from database");
    }
    console.log("deleted the", id);
    res.send("success");
  });
});

module.exports = router;
