import React from "react";
import { Navbar, TextBox, Contorller, Preview } from "../../components";
import Controller from "../../components/controller/Controller";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion } from "../../features/component/components";
export default function Home() {
  // all the essentials of redux
  const dispatch = useDispatch();

  // function to update question in redux;
  const question = (value) => {
    dispatch(addQuestion(value)); // this will dispatch the question value to redux
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="flex my-6">
          <div className="grow  mx-6">
            <div className="controller shadow-lg bg-white-500 w-full p-6">
              <TextBox callback={question} />
              <div className="flex">
                <div className="grow p-2">
                  <Controller />
                </div>
              </div>
            </div>
            <div className="preview w-full my-6 bg-white-500 my-6">
              <Preview />
            </div>
          </div>
          <div className="flex-none w-1/5 h-14 bg-blue-300 mx-6">03</div>
        </div>
      </div>
    </div>
  );
}
