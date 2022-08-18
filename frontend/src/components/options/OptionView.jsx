import React from "react";
import "./options.css";
import { useSelector, useDispatch } from "react-redux";
import { updateResponse } from "../../features/preview/preview";
import { useEffect, useState } from "react";

export default function OptionView({
  array = [],
  id = "",
  mode = "",
  type = "textarea",
  question = "Question goes here",
  callback = () => {},
}) {
  const [changed, setchanged] = useState(array);
  const [ind, setind] = useState("");
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  let copyArr = [];
  let copyObj = {};

  const handleAnswer = (index) => {
    copyArr = [...changed];
    copyObj = { ...changed[index] };
    copyObj.checked = !copyObj.checked;

    copyArr[index] = { ...copyObj };
    console.log(
      "🚀 ~ file: OptionView.jsx ~ line 27 ~ handleAnswer ~ copyArr[index]",
      copyArr[index]
    );

    setchanged(copyArr);
    console.log("whole array", copyArr, "index checked", index);

    dispatch(
      updateResponse({ id: id, type: type, value: copyArr, question: question })
    );
    console.log(response);
  };
  console.log("we are checking mode", mode);
  useEffect(() => {}, [ind]);
  if (mode == "response") {
    return (
      <div className="p-3">
        <div>
          <h1 className="text-xl font-bold">{question}</h1>
        </div>
        <br />
        <div className="flex flex-wrap text-gray-500 ">
          {array.map((x, i) => {
            return (
              <div className="w-1/3 my-3">
                <input
                  className="custom-check"
                  type="checkbox"
                  name="checkbox1"
                  value="true"
                  checked={x.checked}
                  disabled
                ></input>
                <label for="checkbox1" className="custom-check-lable">
                  {x.text}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap">
      {array.map((x, i) => {
        return (
          <div className="w-1/3 my-3">
            <input
              className="custom-check"
              type="checkbox"
              name="checkbox1"
              value="true"
              onChange={(e) => {
                handleAnswer(i);
              }}
            ></input>
            <label for="checkbox1" className="custom-check-lable">
              {x.text}
            </label>
          </div>
        );
      })}
    </div>
  );
}
