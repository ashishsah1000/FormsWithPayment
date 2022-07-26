import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "redux";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid/";
import "./controller.css";
import { components } from "../../features/components";
import TextBox from "../textBox/TextBox";

export default function Controller() {
  const [options, setOptions] = useState([
    { sno: "1", text: "" },
    { sno: "2", text: "" },
    { sno: "3", text: "" },
    { sno: "4", text: "" },
  ]);

  //   add options
  var newArray = options;

  const addOptions = () => {
    var newArray = options;
    newArray.push({
      sno: options.data.length + 1,
      text: "",
    });
    setOptions();
    console.log(options);
  };
  const addElement = (type) => {
    if (type == "options") {
      //
    }
  };

  //   useEffect
  useEffect(() => {}, [options]);

  return (
    <div className="w-full mx-12  text-gray-500 ">
      <div className="flex flex-wrap options-box">
        {options?.map((x, i) => {
          return (
            <input
              className="w-1/3 mx-6 my-4 option-box p-1 border-solid border-2 border-grey-500 rounded"
              type="text"
              placeholder={i + 1}
              required
            ></input>
          );
        })}
      </div>

      <button
        onClick={() =>
          setOptions(newArray.push({ sno: newArray.length + 1, text: "" }))
        }
      >
        Add Option
      </button>
      <br />
      <div className="options flex "></div>
      <div className="options flex">
        <button className="drop-shadow-sm bg-gray-50 mx-6">
          <CheckCircleIcon className="h-6 " /> &nbsp;Options
        </button>
        <button className="drop-shadow-sm bg-gray-50 mx-6">
          <EmojiHappyIcon className="h-6 " /> &nbsp;Rating
        </button>
        <button className="drop-shadow-sm bg-gray-50 mx-6">
          <PencilAltIcon className="h-6 " /> &nbsp;Text Box
        </button>
        <select>
          <option value="Other Elements">Select Element</option>
          <option value="Other Elements">Element 1</option>
          <option value="Other Elements">Element 2</option>
          <option value="Other Elements">Element 3</option>
        </select>
        <button className="text-blue-900 m-full">
          <PlusCircleIcon className="h-6 " /> &nbsp; Add Element
        </button>
      </div>
    </div>
  );
}
