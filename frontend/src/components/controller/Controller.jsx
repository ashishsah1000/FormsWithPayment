import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  PlusCircleIcon,
  CalendarIcon,
} from "@heroicons/react/solid/";
import "./controller.css";
import { selectComponent } from "../../features/component/components";
import { Rating, Options, Textarea, DatePick, Chips } from "../";

export default function Controller() {
  // use of redux
  const dispatch = useDispatch();
  // selected contains the data of the selected element
  const selected = useSelector((state) => state.component.selectedComponent);
  // question contains the data of the question stored in redux
  const question = useSelector((state) => state.component.question);

  // function that adds and verify the element and question to redux
  const addElement = () => {
    if (selected == "" || question == "") {
      console.log("error either question or type", question, "type=", selected);
    } else {
      console.log("dispatch will be called");
    }
  };

  let created = document.querySelector(".element-holder");

  // handle active button
  const handleActive = (e) => {
    let created = document.querySelector(".element-holder");
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

      <div className="options flex">
        <div className="flex grow">
          <button
            className="drop-shadow-sm bg-gray-50 mx-6"
            onClick={(e) => {
              dispatch(selectComponent("options"));
              handleActive(e);
            }}
          >
            <CheckCircleIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6"
            onClick={(e) => {
              dispatch(selectComponent("rating"));
              handleActive(e);
            }}
          >
            <EmojiHappyIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6"
            onClick={(e) => {
              dispatch(selectComponent("textarea"));
              handleActive(e);
            }}
          >
            <PencilAltIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6"
            onClick={(e) => {
              dispatch(selectComponent("datepick"));
              setchange(!change);
            }}
          >
            <CalendarIcon className="h-6 " />
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
        </div>
        <div>
          <button
            className="text-blue-900 m-full items-end mr-10"
            onClick={() => addElement()}
          >
            <PlusCircleIcon className="h-6 " /> &nbsp; Add Element
          </button>
        </div>
      </div>
    </div>
  );
}
