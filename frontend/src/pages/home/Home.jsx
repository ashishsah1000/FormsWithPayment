import React, { useEffect } from "react";
import { Navbar, TextBox, Contorller, Preview, Chips } from "../../components";
import Controller from "../../components/controller/Controller";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, createError } from "../../features/component/components";
import "./home.css";
export default function Home() {
  // all the essentials of redux
  const dispatch = useDispatch();

  // function to update question in redux;
  const question = (value) => {
    dispatch(addQuestion(value)); // this will dispatch the question value to redux
  };
  const errors = useSelector((state) => state.component.errors);
  const preErros = errors;
  const mountError = () => {
    return (
      <Chips
        destroy={true}
        type={errors[errors.length - 1].type}
        text={errors[errors.length - 1].text}
      />
    );
  };
  useEffect(() => {
    console.log("error was changed", errors);
  }, []);

  return (
    <div className="home">
      <div className="home-error">
        {errors.map((x, i) => {
          if (errors.length - 1 == i) {
            return (
              <Chips
                destroy={true}
                type={errors[errors.length - 1].type}
                text={errors[errors.length - 1].text}
              />
            );
          }
        })}
      </div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="flex flex-wrap my-6">
          <div className="grow  mx-6">
            <div className="controller shadow-lg bg-blue-900 controller-home w-full p-6 rounded">
              <TextBox padding={3} callback={question} />
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
