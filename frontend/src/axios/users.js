import axios from "axios";
const baseUrl = "http://localhost:3000/users";

export const createUser = async () => {};

//check login of the user
export const userLogin = async (username, password) => {
  const url = baseUrl + "/signin";
  let response = "something should be there";
  await axios({
    method: "POST",
    withCredentials: true,
    data: { username: username, password: password },
    url: url,
  }).then((res) => {
    response = res.data;
    return response;
  });
  return response;
};
