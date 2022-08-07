import React from "react";
import Chips from "../chips/Chips";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Rating,
  Textarea,
  DatePick,
  OptionView,
  Files,
  TextBox,
  RadioView,
  Delete,
} from "../";
import { LockClosedIcon } from "@heroicons/react/solid/";

export default function Preview() {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.component.previewComponents);
  //   onchange function for options
  const optionsSelected = (data) => {
    console.log(data);
  };

  return (
    <div className="  md:max-w-3xl lg:max-w-6xl bg-grey-100 shadow-lg p-6 preview ">
      <div className="title">
        <h1 className="text-4xl font-bold my-4">Title of the Form</h1>
        <h3>Some other information</h3>
      </div>
      <div className="form-data"></div>

      {preview.length > 0 ? (
        <div>
          {preview.map((x, i) => {
            if (x.type == "rating") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Rating />
                </div>
              );
            }
            if (x.type == "textarea") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Textarea />
                </div>
              );
            }
            if (x.type == "datepick") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <DatePick />
                </div>
              );
            }
            if (x.type == "file") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Files />
                </div>
              );
            }
            if (x.type == "options") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <OptionView
                    array={x.options.data}
                    callback={optionsSelected}
                  />
                </div>
              );
            }
            if (x.type == "radio") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <RadioView
                    array={x.options.data}
                    callback={optionsSelected}
                  />
                </div>
              );
            }
            if (x.type == "textbox") {
              return (
                <div className="preview-elements my-6">
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <TextBox
                    width={"1/3"}
                    padding={2}
                    placeholder={"Enter your answer"}
                    otherClass={"mx-3"}
                  />
                </div>
              );
            }
            if (x.type == "section") {
              return (
                <div
                  className={`my-6 preview-elements  sectionPreview `}
                  style={{ background: x.data.properties.background }}
                >
                  <div className="delete-holder">
                    <Delete id={i} />
                  </div>
                  <h1 className="text-4xl font-bold"> {x.question}</h1>
                  <h1 className="my-4 mx-3">{x.data.lable}</h1>
                </div>
              );
            }
          })}
          <button
            className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
            onClick={(e) => {}}
          >
            Submit &nbsp;
            <LockClosedIcon className="h-6 " />
          </button>
        </div>
      ) : (
        <Chips text="Added questions will appear here" />
      )}
    </div>
  );
}
