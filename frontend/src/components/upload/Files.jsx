import React from "react";
import { PaperClipIcon } from "@heroicons/react/solid/";
import { uploadFileResponse } from "../../axios/response";
import { useDispatch } from "react-redux";
import { updateResponse } from "../../features/preview/preview";
import { createError } from "../../features/component/components";

export default function Files({
  mode = "preview",
  id = "",
  type = "file",
  question = "",
  formId = "",
}) {
  var dispatch = useDispatch();
  const handleUpload = async (e) => {
    console.log("upload the file ");
    const res = await uploadFileResponse(e.target.files[0]);
    console.log(res);
    if ((res.data.status = "success")) {
      console.log(res);
      dispatch(
        createError({ text: "Your file was Uploaded!", type: "success" })
      );
      dispatch(
        updateResponse({
          id: id,
          type: type,
          value: res.data.url,
          question: question,
          formid: formId,
        })
      );
    } else {
      dispatch(
        createError({ text: "Some error happend in upload!", type: "warning" })
      );
    }
  };
  return (
    <div className="my-6 mx-6">
      <input
        type="file"
        name="uploadFile"
        onChange={(e) => {
          handleUpload(e);
        }}
      ></input>
      <label for="uploadFile">
        <span className="flex my-2 text-red-100">
          <PaperClipIcon className="h-6 " /> &nbsp;Select your file
        </span>
      </label>
      {/* {mode == "submit" || "preview" ? (
        <button
          className="uploadFile bg-sky-700 text-white"
          onChange={(e) => {
            console.log("upload the file ");
            uploadFileResponse(e.target.Files[0]);
          }}
        >
          Upload
        </button>
      ) : (
        <></>
      )} */}
    </div>
  );
}
