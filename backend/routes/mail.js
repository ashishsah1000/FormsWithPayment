var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");
const passport = require("passport");
const { mail, outlookMail } = require("../mail/credentials/setup");

router.post("/", (req, res, next) => {
  // mail("hellow there got your mail","ashishsah1000@gmail.com")
  if (req.user) {
    console.log("user data", req.body.mail);
    const subject = req.body.mail.subject;
    const body = req.body.mail.body;
    const sign = req.body.mail.sign;
    const contacts = req.body.mail.contacts;
    const link = req.body.mail.link;

    contacts.map((x) => {
      const data = {
        link,
        subject,
        body,
        first: x.first,
        last: x.last,
        salute: x.salutation,
        from: "some@company.com",
      };
      mail(data, x.label);
      // outlookMail(data, x.label);
    });
    //call the essential mail function
    // mail("hellow there got your mail", "ashishsah1000@gmail.com");
    res.send({ status: "success", data: " Recived successfully" });
  } else {
    res.send({ status: "failed", data: "autharization error" });
  }
});

module.exports = router;
