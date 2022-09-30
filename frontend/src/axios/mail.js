import axios from "axios";
const baseUrl = "http://localhost:3000/mail/";

export const sendMail = async () => {
  var data = "";
  await axios({
    method: "GET",
    url: baseUrl,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
