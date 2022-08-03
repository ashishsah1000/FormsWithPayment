import React from "react";
import "./options.css";
// import {useSelector,useDispatch} from "react-redux"

export default function OptionView({ array = [], callback = () => {} }) {
  return (
    <div className="flex flex-wrap">
      {array.map((x) => {
        return (
          <div className="w-1/3 my-3">
            <input
              className="custom-check"
              type="checkbox"
              name="checkbox1"
              value="true"
              onChange={(e) => {
                console.log("was changed in options", e.target.checked);
              }}
            ></input>
            <label for="checkbox1" className="custom-check-lable">
              {x.text}
            </label>
          </div>
        );
      })}
    </div>
  );
}
