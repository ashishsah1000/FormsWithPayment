import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid/";
import "./controller.css";
import { selectComponent } from "../../features/component/components";
import { Rating, Options, Textarea, DatePick, Chips } from "../";

export default function Controller() {
  // use of redux
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.component.selectedComponent);
  console.log("from selected component useSelector", selected);
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
      {selected == "" ? (
        <div className="w-full">
          {" "}
          <Chips text="Select the type of question or info !" />
        </div>
      ) : (
        ""
      )}
      {selected == "datepick" ? (
        <div className="w-full">
          <DatePick />
        </div>
      ) : (
        ""
      )}
      {selected == "options" ? (
        <div className="w-full">
          <Options />
        </div>
      ) : (
        ""
      )}
      {selected == "textarea" ? (
        <div className="w-full">
          <Textarea />
        </div>
      ) : (
        ""
      )}
      {selected == "rating" ? (
        <div className="w-full">
          <Rating />
        </div>
      ) : (
        ""
      )}

      <div className="options flex flex-wrap">
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            dispatch(selectComponent("options"));
            handleActive(e);
          }}
        >
          <CheckCircleIcon className="h-6 " /> &nbsp;Options
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            dispatch(selectComponent("rating"));
            handleActive(e);
          }}
        >
          <EmojiHappyIcon className="h-6 " /> &nbsp;Rating
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            dispatch(selectComponent("textarea"));
            handleActive(e);
          }}
        >
          <PencilAltIcon className="h-6 " /> &nbsp;Text Box
        </button>
        <button
          className="drop-shadow-sm bg-gray-50 mx-6"
          onClick={(e) => {
            dispatch(selectComponent("datepick"));
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
              dispatch(selectComponent("datepick"));
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
