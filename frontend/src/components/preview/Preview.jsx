import React from "react";
import Chips from "../chips/Chips";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Textarea, DatePick } from "../";
import { LockClosedIcon } from "@heroicons/react/solid/";

export default function Preview() {
  const dispatch = useDispatch();
  const preview = useSelector((state) => state.component.previewComponents);
  console.log("from preview", preview);
  return (
    <div className="w-full bg-grey-100 shadow-lg p-6">
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
                <div className=" my-6">
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Rating />
                </div>
              );
            }
            if (x.type == "textarea") {
              return (
                <div className=" my-6">
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Textarea />
                </div>
              );
            }
            if (x.type == "datepick") {
              return (
                <div className=" my-6">
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <DatePick />
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
