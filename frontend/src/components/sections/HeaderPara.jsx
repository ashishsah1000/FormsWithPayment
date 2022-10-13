import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Textarea, Chips } from "../";
import "./sections.css";
import { createError } from "../../features/component/components";

export default function HeaderPara({ callback = () => {} }) {
  const [lable, setLable] = useState("");
  const [background, setBackground] = useState("");
  const [textColor, settextColor] = useState("");
  const dispatch = useDispatch();

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
                settextColor(e.target.value);
                console.log("actual color", e.target.value);
                console.log("this is the texcolor", textColor);
                callCallback();
              }}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
