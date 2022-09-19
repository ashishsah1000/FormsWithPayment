import React from "react";
import { XCircleIcon, PaperAirplaneIcon } from "@heroicons/react/solid/";
import "./submit.css";
export default function SubmitModal({
  text = "Are you sure?",
  callback = () => {},
  close = () => {},
}) {
  return (
    <div className="people-modal text-gray-600 ">
      <div className="h-96 w-1/2 bg-gray-100 mx-auto mt-48 p-6 rounded">
        <div className="absolute  w-1/2 flex flex-row-reverse">
          <button
            className="mr-8"
            onClick={() => {
              close();
            }}
          >
            {" "}
            <XCircleIcon className="h-6 hover:text-red-500" />
          </button>
        </div>
        <div className="flex">
          <h1 className="text-4xl font-thin ml-3" align="center">
            {text}
          </h1>
        </div>
        <div className="reason flex justify-center my-8">
          <textarea
            name="reason"
            id=""
            cols="60"
            rows="5"
            className="p-6 font-thin"
            placeholder="Any reason?"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            className=" bg-blue-500 text-blue-100"
            onClick={() => {
              callback();
            }}
          >
            {" "}
            &nbsp; Submit &nbsp;
            <span style={{ transform: "rotate(90deg)" }}>
              <PaperAirplaneIcon className="h-6" />
            </span>
          </button>
          <button
            className=" bg-red-500 text-red-100 mx-3"
            onClick={() => {
              close();
            }}
          >
            {" "}
            &nbsp; Cancel &nbsp;
            <span style={{ transform: "rotate(90deg)" }}>
              <XCircleIcon className="h-6" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
