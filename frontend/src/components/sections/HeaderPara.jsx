import React, { useState } from "react";
import { Textarea, Chips } from "../";
import "./sections.css";

export default function HeaderPara({ callback = () => {} }) {
  const [lable, setLable] = useState("");
  const [background, setBackground] = useState("dodgerblue");
  const callCallback = () => {
    callback({
      lable: lable,
      properties: {
        background: background,
      },
    });
  };
  return (
    <div>
      <div className="w-full">
        <Chips text="This will be a section" type="cold" />
        <textarea
          className="p-3 mx-3"
          rows="5"
          cols={70}
          placeholder="Enter the note for section "
          onChange={(e) => {
            setLable(e.target.value);
            callCallback();
          }}
        ></textarea>
        <input
          type="color"
          onChange={(e) => {
            console.log(e.target.value);
            setBackground(e.target.value);
            callCallback();
          }}
        ></input>
      </div>
    </div>
  );
}
