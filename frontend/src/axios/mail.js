import axios from "axios";
const baseUrl = "http://localhost:3000/mail/";

export const sendMail = async (maildata) => {
  var data = "";
  await axios({
    method: "POST",
    withCredentials: true,
    url: baseUrl,
    data: { mail: maildata },
  })
    .then((res) => {
      console.log(res);
      data = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};
