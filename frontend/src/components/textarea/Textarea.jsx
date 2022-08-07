import React from "react";
import "./textarea.css";

export default function Textarea({ placeholder = "Enter your response here" }) {
  return (
    <div className="textarea-component ">
      <textarea placeholder={placeholder} cols="90" rows="5"></textarea>
      <br />
      &nbsp;
    </div>
  );
}
