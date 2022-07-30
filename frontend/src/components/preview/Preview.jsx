import React from "react";
import Chips from "../chips/Chips";
import "./preview.css";

export default function Preview() {
  return (
    <div className="w-full bg-grey-100 shadow-lg p-6">
      <div className="title">
        <h1 className="text-4xl font-bold my-4">Title of the Form</h1>
        <h3>Some other information</h3>
      </div>
      <div className="form-data"></div>
      <Chips text="Preview Section is here" />
    </div>
  );
}
