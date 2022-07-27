import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid/";
import "./options.css";

export default function Options() {
  const [options, setOptions] = useState([
    { sno: "1", text: "" },
    { sno: "2", text: "" },
    { sno: "3", text: "" },
    { sno: "4", text: "" },
  ]);

  // removing a option from the array
  const removeOption = (i) => {
    var newArray = options;
    newArray.splice(i, 1);
    console.log(newArray);
    setOptions([...newArray]);
  };

  useEffect(() => {}, [options]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap options-box">
        {options.map((x, i) => {
          return (
            <div className="flex">
              <input
                className="grow mx-6 my-4 option-box p-1 border-solid border-2 border-grey-500 rounded"
                type="text"
                placeholder={i + 1}
                required
              ></input>
              <TrashIcon
                className="text-red-300 h-6 deleteInputIcon mt-5"
                onClick={() => removeOption(i)}
              />{" "}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          setOptions([...options, { sno: options.length + 1, text: "" }]);
        }}
      >
        Add Option
      </button>
    </div>
  );
}
