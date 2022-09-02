// create a new form
import axios from "axios";

const baseUrl = "http://localhost:3000";

// create form first step
export const createForm = async (title, description, formArray) => {
  const url = baseUrl + "/forms/create";
  let response = "something should be there";
  await axios({
    method: "POST",
    withCredentials: true,
    data: { title: title, description: description, form: formArray },
    url: url,
  }).then((res) => {
    response = res.data;
    return response;
  });
  return response;
};
// modify form
export const modifyForm = async (id, data, title, description) => {
  const url = baseUrl + `/forms/edit/save/${id}`;
  let response = "something should be there";
  await axios({
    method: "POST",
    withCredentials: true,
    data: { data: data, title: title, description: description },
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

// submit the response of the form

export const submitForm = async (formData) => {
  const url = baseUrl + `/forms/submit/response`;
  console.log("we are reciving this data that has to be sent", formData);
  var data = false;

  await axios({
    method: "POST",
    withCredentials: "true",
    data: formData,
    url: url,
  }).then((res) => {
    if (res) {
      data = res;
    }
  });
  return data;
};

// get all the responses on specific form
export const getAllResponse = async (id) => {
  const url = baseUrl + `/forms/response/all/${id}`;
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
// get specific response on specific form
export const getResponse = async (id) => {
  const url = baseUrl + `/forms/response/${id}`;
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

// delete a response data with a specific id
export const deleteResponse = async (id) => {
  const url = baseUrl + `/forms/response/delete/${id}`;
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

// delete all response when a form is deleted
//todo

//publish section set publish and update it to pending all be used by creator
export const publishForm = async (id) => {
  const url = baseUrl + `/forms/publish/`;
  var data = false;
  await axios({
    method: "POST",
    data: { id: id },
    withCredentials: "true",
    url: url,
  }).then((res) => {
    if (res) {
      data = res;
    } else data = { type: "error", text: "some error has happened" };
  });
  return data;
};

// get all the forms that has the pending status for publisher and checker
export const allFormToApprove = async () => {
  const url = baseUrl + `/forms/approve/`;
  var data = "";
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
