var nodemailer = require("nodemailer");
var { template1 } = require("../templates/template");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "orignaldev1000@gmail.com",
    pass: "",
  },
});

var transporterOffice = nodemailer.createTransport({
  host: "smtp-gw.us.dnb.com",
  auth: {
    user: "khannapo@dnb.com",
    pass: "Paripoo@248",
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 25,
  secureConnection: false,
  secure: false,
  requireTLS: true,
});

function sendMail(data, to) {
  const mailOptions = {
    from: "orignaldev1000@gmail.com", // sender address
    to: to, // list of receivers
    subject: data.subject, // Subject line
    // text: Data,
    html: template1(
      data.salute,
      data.first,
      data.last,
      data.subject,
      data.body,
      data.from,
      to,
      data.link
    ), // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

function sendOutlook(data, to) {
  console.log("was called outlook");
  const mailOptions = {
    from: "khannapo@dnb.com",
    to: to,
    subject: data.subject,
    html: template1(
      data.salute,
      data.first,
      data.last,
      data.subject,
      data.body,
      data.from,
      to,
      data.link
    ),
  };
  transporterOffice.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
}
module.exports = {
  mail: sendMail,
  outlookMail: sendOutlook,
};
