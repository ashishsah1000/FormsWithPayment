import React from "react";
import "./textarea.css";

export default function Textarea() {
  return (
    <div className="textarea-component">
      <textarea
        placeholder="Enter your response here"
        cols="90"
        rows="5"
      ></textarea>
      <br />
      &nbsp;
    </div>
  );
}
