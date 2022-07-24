import React from "react";
import "./TextBox.css";

export default function TextBox({
  // mode = edit/show
  mode = "edit",
  question = "this is the question that we gonna ask?",
  answer = "Answer goes here",
}) {
  const editView = false;
  if (mode == "edit") {
    return (
      <div className="inputBox max-w-full shadow-lg py-8 px-8  ">
        <input
          type="text"
          name="question"
          id=""
          className="w-full px-3 py-3 border-solid border-2 border-blue-500 rounded"
          placeholder="Start typing here..."
        />
      </div>
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
