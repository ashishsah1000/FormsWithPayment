import React from "react";
import "./textarea.css";
import { useSelector, useDispatch } from "react-redux";
import { setResponses, updateResponse } from "../../features/preview/preview";
export default function Textarea({
  placeholder = "Enter your response here",
  mode = "",
  callback = () => {},
  id = "",
}) {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  let copy = { response: response };
  copy.response[0] = {};

  const handleChange = (value) => {
    copy[id] = {
      ...copy[id],
      resonse: { response: true, text: value, id: id },
    };
    console.log(copy);
    //dispatch(setResponses({ response: true, text: value, id: id }));
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
          handleChange(e.target.value);
        }}
      ></textarea>
      <br />
      &nbsp;
    </div>
  );
}
