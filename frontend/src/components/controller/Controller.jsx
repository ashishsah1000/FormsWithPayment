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
import { Rating, Options, Textarea, DatePick } from "../";

export default function Controller() {
  const [showOption, setshowOption] = useState(false);
  const [showTextArea, setshowTextArea] = useState(false);
  const [showRatingArea, setshowRatingArea] = useState(false);
  const [showDateArea, setDateArea] = useState(false);

  let oneOpen = false;

  let created = document.querySelector(".element-holder");

  // handle active button
  const handleActive = (e) => {
    let created = document.querySelector(".element-holder");

    created.innerHTML = "";
    if (e.target.classList.contains("active")) {
      // console.log("true");
      e.target.classList.remove("active");
    } else {
      e.target.classList.add("active");
      // console.log(false);
    }
  };
  const [change, setchange] = useState(false);
  const dynamicElement = (element, reffer) => {
    console.log("was called from dynamic");
    return <div>{element}</div>;
  };
  useEffect(() => {}, []);

  return (
    <div className="w-full mx-12  text-gray-500 ">
      {change ? <div className="w-full">{dynamicElement()}</div> : ""}
      <div className="w-full element-holder">
        {showOption ? (
          <div className=" ">
            <Options />
          </div>
        ) : (
          ""
        )}
        {showTextArea ? (
          <div className=" ">
            <Textarea />
          </div>
        ) : (
          ""
        )}
        {showRatingArea ? (
          <div className=" ">
            <Rating />
          </div>
        ) : (
          ""
        )}
        {showDateArea ? (
          <div className=" ">
            <DatePick />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="options flex flex-wrap">
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            handleActive(e);
            setshowOption(!showOption);
          }}
        >
          <CheckCircleIcon className="h-6 " /> &nbsp;Options
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            handleActive(e);
            setshowRatingArea(!showRatingArea);
          }}
        >
          <EmojiHappyIcon className="h-6 " /> &nbsp;Rating
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            handleActive(e);
            setshowTextArea(!showTextArea);
          }}
        >
          <PencilAltIcon className="h-6 " /> &nbsp;Text Box
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            setDateArea(!showDateArea);
          }}
        >
          <PencilAltIcon className="h-6 " /> &nbsp;Date Picker
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            dynamicElement(<DatePick />, true);
            setchange(!change);
          }}
        >
          <PencilAltIcon className="h-6 " /> &nbsp;Date Picker
        </button>

        <select>
          <option value="Other Elements">Select Element</option>
          <option
            value="Other Elements"
            onClick={() => {
              setDateArea(true);
              console.log("was called");
            }}
          >
            Date Picker
          </option>
          <option value="Other Elements">Time Picker</option>
          <option value="Other Elements">Yes or No</option>
          <option value="Other Elements">Element 3</option>
        </select>
        <button className="text-blue-900 m-full">
          <PlusCircleIcon className="h-6 " /> &nbsp; Add Element
        </button>
      </div>
    </div>
  );
}
