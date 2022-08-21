import React, { useState, useEffect } from "react";
import { TextBox, Controller, Preview, Publish } from "../../components/";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, createError } from "../../features/component/components";
import "./creator.css";

export default function Creator({ mode = "create" }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  // all the essentials of redux
  const dispatch = useDispatch();
  if (mode != "") {
    // dispatch(createError({ text: `you are in ${mode}`, type: "cold" }));
  }

  // function to update question in redux;
  const question = (value) => {
    dispatch(addQuestion(value)); // this will dispatch the question value to redux
  };

  return (
    <div>
      <div className="flex flex-wrap">
        <div className=" left-container mx-auto">
          <div className=" bg-white-500 ">
            <Preview mode={mode} />
          </div>
          {/* <div className="controller shadow-lg bg-blue-900 controller-home p-6 rounded">
            <TextBox padding={3} callback={question} />
            <div className="flex">
              <div className="grow p-2">
                <Controller />
              </div>
            </div>
          </div> */}
        </div>
        <div className=" right-container bg-gray-100 mt-10 rounded p-3">
          <Publish mode={mode} />
        </div>
      </div>
    </div>
  );
}
