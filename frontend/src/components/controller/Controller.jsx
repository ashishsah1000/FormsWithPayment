import React from "react";
import {
  CheckCircleIcon,
  EmojiHappyIcon,
  PencilAltIcon,
} from "@heroicons/react/solid/";
import "./controller.css";

export default function Controller() {
  return (
    <div className="w-full mx-12 flex text-gray-500">
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
      </div>
    </div>
  );
}
