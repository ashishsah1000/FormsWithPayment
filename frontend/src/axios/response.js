// all the form that has been created will use this response method

import axios from "axios";
import download from "js-file-download";
const baseUrl = "http://localhost:3000/forms";

export const checkUserData = async (formid, data) => {
  const url = baseUrl + `/collect/response/${formid}`;
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

// upload the file for the specific user

export const uploadFileResponse = async (file) => {
  const url = baseUrl + `/response/file/upload`;
  var response = "failed";
  var formData = new FormData();
  formData.append(`file`, file);
  formData.append("username", "soemeone");
  formData.append("id", 7);
  console.log(file);
  await axios({
    method: "POST",
    withCredentials: true,
    data: formData,
    url: url,
    onUploadProgress: (ProgressEvent) => {
      let progress =
        Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) + "%";
      console.log(progress);
    },
  }).then((res) => {
    console.log("the respond we are reciving", res);
    response = res;
    return response;
  });
  return response;
};

export const getAttachmentFile = async (dir) => {
  console.log("we are sending the req for", dir);
  var response = "";
  var url = baseUrl + "/response/get/upload";
  const link = document.createElement("a");
  link.target = "_blank";

  // return response;
  await axios({
    method: "POST",
    withCredentials: true,
    data: { dir: dir },
    url: url,
    responseType: "blob",
  }).then((res) => {
    console.log(res);
    link.download = `fBuild${res.config.data.split("fBuild")[1].split(".")[0]}`;
    link.href = URL.createObjectURL(
      new Blob([res.data], { type: `${res.data.type}` })
    );
    link.click();
  });
};
