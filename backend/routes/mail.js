var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");
const passport = require("passport");
const { mail, outlookMail } = require("../mail/credentials/setup");

router.get("/", (req, res, next) => {
  // mail("hellow there got your mail","ashishsah1000@gmail.com")
  outlookMail("hellow there got your mail", "ashishsah1000@gmail.com");
  res.send("surely in the mail section");
});

module.exports = router;
