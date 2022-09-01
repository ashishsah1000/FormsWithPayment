var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  if (req.user) {
    console.log(req.user);
    res.send("user alredy logged in", req.user);
  }
  res.render("index", { title: "Express" });
});

module.exports = router;
