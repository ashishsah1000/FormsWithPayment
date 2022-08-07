import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
  PlusCircleIcon,
  PaperClipIcon,
  CalendarIcon,
  StopIcon,
  PencilIcon,
  CollectionIcon,
} from "@heroicons/react/solid/";
import "./controller.css";
import {
  addComponent,
  selectComponent,
  createError,
} from "../../features/component/components";
import {
  Rating,
  Options,
  Textarea,
  DatePick,
  Chips,
  Files,
  Radio,
  TextBox,
  HeaderPara,
} from "../";

export default function Controller() {
  // use of redux
  const dispatch = useDispatch();
  // selected contains the data of the selected element
  const selected = useSelector((state) => state.component.selectedComponent);
  // question contains the data of the question stored in redux
  const question = useSelector((state) => state.component.question);

  // check the data of options this will only be used in radio and options time
  let optionData = {};
  const getOptions = (array) => {
    optionData = {
      type: "single",
      data: array,
    };
  };

  // functions for getting the section data
  let sectionData = {};
  let getSection = (data) => {
    sectionData = {
      lable: data.lable,
      properties: data.properties,
    };
    console.log("from controller", sectionData);
  };

  // function that adds and verify the element and question to redux
  const addElement = () => {
    if (selected == "" || question == "") {
      console.log("error either question or type", question, "type=", selected);
      dispatch(
        createError({
          type: "warning",
          text: "Please enter the question / options",
        })
      );
    } else if (selected == "section") {
      dispatch(
        addComponent({
          type: selected,
          question: question,
          data: sectionData,
        })
      );
    } else if (selected == "options" || selected == "radio") {
      // check if options data in missing
      let flag = 0;
      optionData.data.map((x) => {
        if (x.text == "") flag = 1;
      });
      if (flag == 0) {
        dispatch(
          addComponent({
            question: question,
            type: selected,
            options: optionData,
          })
        );
      } else {
        console.log("options are missing");
      }
    } else {
      console.log("dispatch will be called");
      dispatch(addComponent({ question: question, type: selected }));
      // for options dispatch it in some other way
    }
  };

  let created = document.querySelector(".element-holder");

  // handle active button
  const handleActive = (e) => {
    let created = document.querySelector(".element-holder");
  };

  useEffect(() => {}, []);

  return (
    <div className="controller lg:w-full sm:w-full md:w-full   text-gray-700 ">
      {selected == "" ? (
        <div className="w-full">
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
      {selected == "textbox" ? (
        <div className="w-full mb-3">
          <TextBox width={48} padding={2} placeholder={"Enter your answer"} />
        </div>
      ) : (
        ""
      )}
      {selected == "options" ? (
        <div className="w-full">
          <Options getData={getOptions} />
        </div>
      ) : (
        ""
      )}
      {selected == "radio" ? (
        <div className="w-full">
          <Radio getData={getOptions} />
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
      {selected == "file" ? (
        <div className="w-full">
          <Files />
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
      {selected == "section" ? (
        <div className="w-full">
          <HeaderPara callback={getSection} />
        </div>
      ) : (
        ""
      )}

      <div className="options flex flex-wrap">
        <div className="flex grow text-blue-900 flex-wrap">
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("options"));
              handleActive(e);
              dispatch(
                createError({
                  type: "cold",
                  text: "Options Component Selected",
                })
              );
            }}
          >
            <CheckCircleIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("radio"));
              dispatch(
                createError({ type: "cold", text: "Radio Component Selected" })
              );
              handleActive(e);
            }}
          >
            <StopIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("rating"));
              handleActive(e);
              dispatch(
                createError({ type: "cold", text: "Rating Component Selected" })
              );
            }}
          >
            <EmojiHappyIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("textbox"));
              dispatch(
                createError({
                  type: "cold",
                  text: "Text-Box Component Selected",
                })
              );

              handleActive(e);
            }}
          >
            <PencilIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("textarea"));
              dispatch(
                createError({
                  type: "cold",
                  text: "Text-Area Component Selected",
                })
              );
              handleActive(e);
            }}
          >
            <PencilAltIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("datepick"));
              dispatch(
                createError({
                  type: "cold",
                  text: "Date Picker Component Selected",
                })
              );
            }}
          >
            <CalendarIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("file"));
              dispatch(
                createError({
                  type: "cold",
                  text: "File Component Selected",
                })
              );
            }}
          >
            <PaperClipIcon className="h-6 " />
          </button>
          <button
            className="drop-shadow-sm bg-gray-50 mx-6 my-3"
            onClick={(e) => {
              dispatch(selectComponent("section"));
              dispatch(
                createError({
                  type: "cold",
                  text: "Section Component Selected",
                })
              );
            }}
          >
            <CollectionIcon className="h-6 " />
          </button>
          {/* <select>
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
          </select> */}
        </div>
        <div>
          <button
            className="bg-blue-900 text-gray-100 m-full items-end mt-3 justify-items-end align-end"
            onClick={() => addElement()}
          >
            <PlusCircleIcon className="h-6 " /> &nbsp; Add Element
          </button>
        </div>
      </div>
    </div>
  );
}
