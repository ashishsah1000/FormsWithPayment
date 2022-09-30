var nodemailer = require("nodemailer");
var { template1 } = require("../templates/template");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
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

function sendMail(Data, to) {
  const mailOptions = {
    from: "orignaldev1000@gmail.com", // sender address
    to: to, // list of receivers
    subject: "From AutoResponder", // Subject line
    text: Data,
    html: template1, // plain text body
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
    subject: "Survey form from D&B",
    text: "hellow from pooja",
    data: "hellow",
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
