import React from "react";
import "./textarea.css";
import { useSelector, useDispatch } from "react-redux";
import { setResponses, updateResponse } from "../../features/preview/preview";
export default function Textarea({
  placeholder = "Enter your response here",
  mode = "",
  callback = () => {},
  id = "",
  type = "textarea",
  question = "Question goes here",
}) {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  const handleChangeTextArea = (data) => {
    dispatch(
      updateResponse({ id: id, type: type, value: data, question: question })
    );
    console.log(response);
  };

  if (mode == "submit") {
  }
  return (
    <div className="textarea-component ">
      <textarea
        placeholder={placeholder}
        cols="90"
        rows="5"
        onChange={(e) => {
          handleChangeTextArea(e.target.value);
        }}
      ></textarea>
      <br />
      &nbsp;
    </div>
  );
}
