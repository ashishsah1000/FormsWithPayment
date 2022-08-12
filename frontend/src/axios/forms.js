// create a new form
import axios from "axios";

const baseUrl = "http://localhost:3000";

// create form first step
export const createForm = async (data) => {
  const url = baseUrl + "/forms/create";
  let response = "something should be there";
  await axios({
    method: "POST",
    withCredentials: true,
    data: data,
    url: url,
  }).then((res) => {
    response = res.data;
    return response;
  });
  return response;
};

// get all the forms
// get the data of specific form with id
export const getAllForm = async () => {
  const url = baseUrl + `/forms/all`;
  var data = [];
  await axios({
    method: "GET",
    withCredentials: "true",
    url: url,
  }).then((res) => {
    if (res) {
      data = res;
    } else data = { type: "error", text: "some error has happened" };
  });
  return data;
};

// get the data of specific form with id
export const getForm = async (id) => {
  const url = baseUrl + `/forms/edit/${id}`;
  var data = [];
  await axios({
    method: "GET",
    withCredentials: "true",
    url: url,
  }).then((res) => {
    if (res) {
      data = res;
    } else data = { type: "error", text: "some error has happened" };
  });
  return data;
};

// delete a form data with a specific id
export const deleteForm = async (id) => {
  const url = baseUrl + `/forms/delete/${id}`;
  var data = false;
  await axios({
    method: "GET",
    withCredentials: "true",
    url: url,
  }).then((res) => {
    if (res) {
      data = res;
    } else data = { type: "error", text: "some error has happened" };
  });
  return data;
};
