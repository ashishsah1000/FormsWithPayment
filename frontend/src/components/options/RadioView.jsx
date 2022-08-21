import React from "react";
import "./options.css";
import { useSelector, useDispatch } from "react-redux";
import { updateResponse } from "../../features/preview/preview";
import { useEffect, useState } from "react";

export default function OptionView({
  id = "",
  type = "textarea",
  mode = "",
  question = "Question goes here",
  array = [],
  callback = () => {},
}) {
  const [changed, setchanged] = useState("");
  const dispatch = useDispatch();
  const handleAnswer = (index) => {
    console.log("whole array", array, "index checked", index);
    let copyArr = [...array];
    let copyObj = { ...array[index] };
    copyObj.checked = !copyObj.checked;
    copyArr[index] = copyObj;
    dispatch(
      updateResponse({ id: id, type: type, value: copyArr, question: question })
    );
  };
  useEffect(() => {
    handleAnswer(changed);
  }, [changed]);
  if (mode == "response") {
    return (
      <div className="flex flex-wrap">
        <form action="">
          {array.map((x, i) => {
            return (
              <div className="w-full my-3">
                <input
                  className="custom-check"
                  type="radio"
                  name="checkbox1"
                  value="true"
                  checked={x.checked}
                  disabled="true"
                ></input>
                <label for="checkbox1" className="custom-check-lable">
                  {x.text}
                </label>
              </div>
            );
          })}
        </form>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap">
      <form action="">
        {array.map((x, i) => {
          return (
            <div className="w-full my-3">
              <input
                className="custom-check"
                type="radio"
                name="checkbox1"
                value="true"
                onClick={(e) => {
                  setchanged(i);
                  console.log("was changed in options", e.target.checked);
                }}
              ></input>
              <label for="checkbox1" className="custom-check-lable">
                {x.text}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
}
