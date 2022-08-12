import React, { useState } from "react";
import { Textarea, Chips } from "../";
import "./sections.css";

export default function HeaderPara({ callback = () => {} }) {
  const [lable, setLable] = useState("");
  const [background, setBackground] = useState("dodgerblue");
  const [textColor, settextColor] = useState("slate-gray");
  const callCallback = () => {
    callback({
      lable: lable,
      properties: {
        background: background,
        color: textColor,
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
        <div className="flex my-3 text-gray-200">
          <div className="mx-6">
            <label htmlFor="bgcolor"> Select background color</label>
            <input
              className="mx-2"
              type="color"
              name="bgcolor"
              onChange={(e) => {
                console.log(e.target.value);
                setBackground(e.target.value);
                callCallback();
              }}
            ></input>
          </div>
          <div className="mx-6">
            <label htmlFor="textcolor"> Select text color</label>
            <input
              className="mx-2"
              type="color"
              name="textcolor"
              onChange={(e) => {
                console.log(e.target.value);
                settextColor(e.target.value);
                callCallback();
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
