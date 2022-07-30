import React from "react";
import { LightBulbIcon } from "@heroicons/react/solid/";
import "./chips.css";

export default function Chips({
  type = "default",
  text = "You can add elements with a click",
}) {
  // type = info | warning | alarm | success
  let badgeColor = "bg-blue-800";
  // if (type == "default")

  return (
    <div
      className={`${badgeColor} basic-grad text-white w-80 py-1 px-1 mx-3 my-3 rounded flex text-sm shadow-md`}
    >
      <div className="mt-1 ">
        <p className="flex">
          <LightBulbIcon className="h-7 justify-right mr-1 " />{" "}
          <span className="mt-1">
            <b>{text}</b>
          </span>
        </p>
      </div>
    </div>
  );
}
