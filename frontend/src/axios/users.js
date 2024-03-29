import axios from "axios";
const baseUrl = "http://localhost:3000/users";

export const createUser = async () => {};

//check login of the user
export const userLogin = async (username, password) => {
  const url = baseUrl + "/login";
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

//logout a user
export const logOut = async () => {
  const url = baseUrl + "/logout";
  let response = "something should be there";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  }).then((res) => {
    response = res.data;
    return response;
  });
  return response;
};

// Register a user to the database
export const registerUser = async (data) => {
  //  data contains - email,username,roles,password
  const url = baseUrl + "/register";
  let response = "something should be there";
  await axios({
    method: "POST",
    withCredentials: true,
    data: data,
    url: url,
  })
    .then((res) => {
      response = res.data;
      return response;
    })
    .catch((err) => {
      response = { status: "error", text: "some error occured" };
    });
  return response;
};

// get all the users from the database
export const getAllUser = async () => {
  const url = baseUrl + "/all";
  let response = "something should be there";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  })
    .then((res) => {
      console.log(res);
      response = res.data;
      return response;
    })
    .catch((err) => {
      response = { status: "error", text: "some error occured" };
    });
  return response;
};

//delete a specific user if you are admin
export const deleteSpecificUser = async (id) => {
  const url = baseUrl + `/delete/${id}`;
  let response = "";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  })
    .then((res) => {
      console.log(res);
      response = res.data;
      return response;
    })
    .catch((err) => {
      response = { status: "error", text: "some error occured" };
    });
  return response;
};

// get all the checkers
export const getAllChecker = async () => {
  const url = baseUrl + "/all/checker";
  let response = "something should be there";
  await axios({
    method: "GET",
    withCredentials: true,
    url: url,
  })
    .then((res) => {
      console.log(res);
      response = res.data;
      return response;
    })
    .catch((err) => {
      response = { status: "error", text: "some error occured" };
    });
  return response;
};
