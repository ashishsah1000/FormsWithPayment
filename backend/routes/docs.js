var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");

router.get("/upload/response", (req, res, next) => {
  res.send("listening to you");
});

module.exports = router;
