import React from "react";
import "./TextBox.css";

export default function TextBox({
  // mode = edit/show
  mode = "edit",
  width = "full",
  placeholder = "Start typing here...",
  question = "this is the question that we gonna ask?",
  answer = "Answer goes here",
  padding = 3,
  otherClass = "",
  callback = () => {},
}) {
  const editView = false;
  if (mode == "edit") {
    return (
      <input
        type="text"
        name="question"
        id=""
        className={`w-${width} my-2  px-2 py-${padding} border-solid border-2 border-grey-500 rounded ${otherClass}`}
        placeholder={placeholder}
        onKeyUp={(e) => callback(e.target.value)}
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
