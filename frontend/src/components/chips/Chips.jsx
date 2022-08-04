import React, { useState, useEffect } from "react";
import { LightBulbIcon } from "@heroicons/react/solid/";
import "./chips.css";

export default function Chips({
  type = "default",
  text = "You can add elements with a click",
  destroy = false,
}) {
  // type = info | warning | alarm | success
  let badgeColor = "bg-blue-800";

  const [fade, setFade] = useState({ fade: "fade-in" });
  // if (type == "default")
  // destroy after few seconds
  const destroyElement = () => {
    const interval1 = setInterval(() => {
      const element = document.querySelector(".info-chip");
      element.remove();
      clearInterval(interval1);
    }, 2000);
  };

  useEffect(() => {
    if (destroy == true) {
      const interval = setInterval(() => {
        if (fade.fade == "fade-in") {
          setFade({ fade: "fade-out" });
        } else {
          setFade({ fade: "fade-in" });
        }
        destroyElement();
        clearInterval(interval);
      }, 1000);
    }
  }, []);

  return (
    <div>
      <div
        className={`info-chip  ${fade.fade} ${badgeColor} basic-grad text-white w-80 py-1 px-1 mx-3 my-3 rounded flex text-sm shadow-md ${type}`}
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
    </div>
  );
}
