import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "redux";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  PlusCircleIcon,
  UserRemoveIcon,
  MinusCircleIcon,
} from "@heroicons/react/solid/";
import "./controller.css";
import { components } from "../../features/components";
import { TextBox, Options } from "../";

export default function Controller() {
  const [showOption, setshowOption] = useState(false);
  useEffect(() => {}, []);

  return (
    <div className="w-full mx-12  text-gray-500 ">
      {showOption ? (
        <div className=" ">
          <Options />
        </div>
      ) : (
        ""
      )}
      <div className="options flex">
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            setshowOption(!showOption);
          }}
        >
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
