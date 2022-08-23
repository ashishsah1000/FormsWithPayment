// all the form that has been created will use this response method

import axios from "axios";

const baseUrl = "http://localhost:3000/forms/collect/response";

export const checkUserData = async (formid, data) => {
  const url = baseUrl + `/${formid}`;
  console.log("this we are reciving", formid, data);
  var response = "failed";
  await axios({
    method: "POST",
    withCredentials: true,
    data: { username: data.username, formid: formid },
    url: url,
  }).then((res) => {
    response = res.data;
    return response;
  });
  return response;
};
