import React from "react";
import { CogIcon } from "@heroicons/react/solid/";
import "./animation.css";

export default function SpinnerButton({ classes = "" }) {
  return (
    <button
      className={`font-bold bg-indigo-500 text-gray-100 shadow-lg ${classes}`}
      disabled="true"
    >
      &nbsp; Checking{" "}
      <span className="animate-spin">
        <CogIcon className="h-6" />
      </span>{" "}
      &nbsp;
    </button>
  );
}
