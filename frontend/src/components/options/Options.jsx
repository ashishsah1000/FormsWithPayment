import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid/";
import { useDispatch, useSelector } from "react-redux";
import "./options.css";

export default function Options({ getData = () => {} }) {
  const [options, setOptions] = useState([
    { sno: "1", text: "", checked: false },
    { sno: "2", text: "", checked: false },
    { sno: "3", text: "", checked: false },
    { sno: "4", text: "", checked: false },
  ]);
  var newOptions = options;
  // declaring dispatch from the redux
  const dispatch = useDispatch;

  // removing a option from the array
  const removeOption = (i) => {
    var newArray = options;
    newArray.splice(i, 1);
    setOptions([...newArray]);
    newOptions = options;
  };

  useEffect(() => {}, [options]);

  return (
    <div className="w-full">
      <div className="flex flex-wrap options-box">
        {options.map((x, i) => {
          return (
            <div className="flex">
              <input
                className="w-full  mx-6 my-4 option-box p-1 border-solid border-2 border-grey-500 rounded"
                type="text"
                placeholder={i + 1}
                required
                onChange={(e) => {
                  newOptions[i].text = e.target.value;
                  getData(newOptions);
                }}
              ></input>
              <TrashIcon
                className="text-red-500 h-6 deleteInputIcon mt-5"
                onClick={() => {
                  removeOption(i);
                  getData(newOptions);
                }}
              />{" "}
            </div>
          );
        })}
      </div>

      <button
        className="text-red-200"
        onClick={() => {
          setOptions([
            ...options,
            { sno: options.length + 1, text: "", checked: false },
          ]);
          getData(options);
        }}
      >
        Add Option
      </button>
    </div>
  );
}
