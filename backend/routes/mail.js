var express = require("express");
var router = express.Router();
var { database } = require("../database/pgdatabase");
const passport = require("passport");
const { mail, outlookMail } = require("../mail/credentials/setup");

router.post("/", (req, res, next) => {
  // mail("hellow there got your mail","ashishsah1000@gmail.com")
  if (req.user) {
    console.log("user data", req.body.mail);
    const formid = req.body.mail.formId;
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

    //send autheroized emails to published
    var sql = `SELECT * FROM published WHERE formid = '${formid}';`;
    database.query(sql, (err, doc) => {
      if (err) {
        console.error(err);
        return res.send({
          status: "failed",
          data: "database error while fetching form",
        });
      } else {
        var emails = contacts.map((x) => x.value);
        var pemails = emails.join(",");
        if (doc.rows.length == 0) {
          var sql2 = `INSERT INTO published (formid,date,signature,emails) VALUES ('${formid}',NOW(),'${sign}', '{${pemails}}');`;
          database.query(sql2, (err, docs) => {
            if (err) {
              console.error(err);
              return res.send({
                status: "failed",
                data: "database error while inserting data",
              });
            } else {
              console.log(docs);
              return res.send({
                status: "success",
                data: " Recived and added to database",
              });
            }
          });
        } else {
          return res.send({
            status: "failed",
            data: " Data already exist for this form",
          });
        }
      }
    });

    // res.send({ status: "success", data: " Recived successfully" });
  } else {
    res.send({ status: "failed", data: "autharization error" });
  }
});

module.exports = router;
