import React from "react";
import "./TextBox.css";
import { useDispatch, useSelector } from "react-redux";
import { updateResponse } from "../../features/preview/preview";
import { useEffect } from "react";

export default function TextBox({
  // mode = edit/show
  mode = "edit",
  id = "",
  type = "",
  width = "full",
  placeholder = "Start typing here...",
  question = "this is the question that we gonna ask?",
  answer = "Answer goes here",
  padding = 3,
  otherClass = "",
  disabled = false,
  clear = false,
  callback = () => {},
}) {
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  const handleChangeTextBox = (data) => {
    dispatch(
      updateResponse({ id: id, type: type, value: data, question: question })
    );
    console.log(response);
  };
  const reduxQuestion = useSelector((state) => state.component.question);

  let quest = "";
  useEffect(() => {
    if (reduxQuestion == "") {
      console.log(true);
      document.querySelector(".addquestionController").value = "";
    }
  }, [reduxQuestion]);

  const editView = false;
  if (mode == "submit") {
    return (
      <input
        type="text"
        name="question"
        id=""
        className={`w-${width} my-2  px-2 py-3 py-${padding} border-solid border-2 border-grey-500 rounded ${otherClass}`}
        placeholder={placeholder}
        onKeyUp={(e) => handleChangeTextBox(e.target.value)}
        disabled={disabled}
      />
    );
  }
  if (mode == "edit") {
    return (
      <input
        type="text"
        name="question"
        id=""
        className={`w-${width} my-2  px-2 py-3 py-${padding}   rounded ${otherClass} addquestionController`}
        placeholder={placeholder}
        onKeyUp={(e) => {
          quest = e.target.value;
          callback(e.target.value);
        }}
        disabled={disabled}
      />
    );
  } else {
    return (
      <div className="w-full shadow-lg py-8 px-8 flex">
        <h1>{question}</h1>
        <h2>{answer}</h2>
      </div>
    );
  }
}
