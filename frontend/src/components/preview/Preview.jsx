import React, { useState, useEffect } from "react";
import Chips from "../chips/Chips";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import { createForm, modifyForm, submitForm } from "../../axios/forms";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  Rating,
  Textarea,
  DatePick,
  OptionView,
  Files,
  TextBox,
  RadioView,
  Delete,
  Controller,
} from "../";
import { LockClosedIcon } from "@heroicons/react/solid/";
import {
  changePreviewComponents,
  createError,
  addQuestion,
} from "../../features/component/components";
import { setResponses } from "../../features/preview/preview";
import { getForm } from "../../axios/forms";
// import { textboxResponse } from "../../response/handlers";

// mode : preview,edit,customize
// preview : delete options and submit button to change response system to be added
// edit : inline edit options to be provied
// create : [] array and starts with redu
// submit : may be we will make another page for this
export default function Preview({
  data = [],
  mode = "",
  title = "This is title",
  description = "Here goes description",
}) {
  const [fetching, setfetching] = useState(false);
  let preview = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  preview = useSelector((state) => state.component.previewComponents);
  const [mainTitle, settitle] = useState("");
  const [mainDescription, setdescription] = useState("");
  //
  // function to update question in redux;
  const question = (value) => {
    dispatch(addQuestion(value)); // this will dispatch the question value to redux
  };

  //fetch the data pf specific form
  const searchForm = async (id) => {
    setfetching(true);
    var res = await getForm(id);
    console.log(res);
    if (res.data.length == 0) {
      navigate("/forms");
      return 0;
    }
    if (res !== "error") {
      setfetching(false);
      settitle(res.data[0].title);
      setdescription(res.data[0].description);

      dispatch(changePreviewComponents(res.data[0].forms));
    } else {
      console.log("unable to fetch data");
    }
  };

  //for preview
  if (data.length > 0) {
    console.log("data is being passed", data);
    preview = data;
    // settitle(title);
    // setdescription(description);
    // dispatch(changePreviewComponents(data));
  }
  let { id } = useParams();

  //   onchange function for options
  const optionsSelected = (data) => {
    console.log(data);
  };

  //handle the submit method and send id
  var userResponse = useSelector((state) => state.preview.responses);
  var userDetails = useSelector((state) => state.preview.userDetails);
  const handleSubmit = async () => {
    var res = await getForm(id);
    var realForm = res.data[0].forms;
    //user response redux is muted object so make a copy of data and check if section is present !
    var copyResponse = [...userResponse];
    for (var i = 0; i < realForm.length; i++) {
      console.log(realForm[i]);
      if (realForm[i].type == "section") {
        console.log(
          "🚀 ~ file: Preview.jsx ~ line 108 ~ handleSubmit ~ realForm[i]",
          realForm[i]
        );

        copyResponse[i] = { ...realForm[i] };
      }
    }
    if (userDetails.email) {
      var res = await submitForm({
        formid: id,
        form: copyResponse,
        email: userDetails.email,
      });
      console.log("This is the response from reques", res);
      if (res.data.status == "success") {
        dispatch(
          createError({ text: "Your response was submitted!", type: "success" })
        );
      }
      navigate(`/thanks`);
    } else {
      dispatch(
        createError({ text: "User details are missing", type: "warning" })
      );
    }
  };

  useEffect(() => {
    if (mode == "edit") {
      const something = searchForm(id);
      console.log("in edit mode", something.data);
      if (something.length > 0)
        dispatch(changePreviewComponents(something.data));
    }
  }, []);

  // this section deals with response functions
  // store the form data in redux and update array with every change

  //dispatch response when responses array is needed
  // dispatch(setResponses(preview));
  const responses = useSelector((state) => state.preview.responses);

  // end of response functions

  //handle edit forms
  const handleEditForm = async () => {};
  if (fetching) return <>Your data is being fetched</>;

  return (
    <div className=" w-11/12 lg:max-w-6xl bg-grey-100 shadow-lg   preview ">
      <div className="title">
        <div className="content">
          <h1 className="text-4xl font-bold my-4">
            {mainTitle.length > 0 ? mainTitle : title}
          </h1>
          <h3>{mainDescription.length > 0 ? mainDescription : description}</h3>
        </div>
      </div>

      <div className="form-data"></div>

      <div className="p-6 bg-gray-100 rounded">
        {preview.map((x, i) => {
          if (x.type == "rating") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <Rating type={x.type} id={i} />
              </div>
            );
          }
          if (x.type == "textarea") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <Textarea
                  type={x.type}
                  id={i}
                  mode="submit"
                  callback={() => {}}
                />
              </div>
            );
          }
          if (x.type == "datepick") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <DatePick type={x.type} id={i} />
              </div>
            );
          }
          if (x.type == "file") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <Files type={x.type} id={i} />
              </div>
            );
          }
          if (x.type == "options") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <OptionView
                  array={x.options.data}
                  callback={optionsSelected}
                  type={x.type}
                  id={i}
                />
              </div>
            );
          }
          if (x.type == "radio") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <RadioView
                  array={x.options.data}
                  callback={optionsSelected}
                  type={x.type}
                  id={i}
                />
              </div>
            );
          }
          if (x.type == "textbox") {
            return (
              <div className="preview-elements my-6">
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="font-bold">Question {i + 1}</h1>
                <h1 className="my-4 mx-3">{x.question}</h1>
                <TextBox
                  width={"1/3"}
                  padding={2}
                  placeholder={"Enter your answer"}
                  otherClass={"mx-3"}
                  type={x.type}
                  id={i}
                  question={x.question}
                  mode="submit"
                />
              </div>
            );
          }
          if (x.type == "section") {
            return (
              <div
                className={`my-6 preview-elements  sectionPreview `}
                style={{
                  background: x.data.properties.background,
                  color: x.data.properties.color,
                }}
              >
                <div className="delete-holder">
                  <Delete id={i} />
                </div>
                <h1 className="text-4xl font-bold"> {x.question}</h1>
                <h1 className="my-4 mx-3">{x.data.lable}</h1>
              </div>
            );
          }
        })}
        {mode == "create" ? (
          <>
            <div className="controller shadow-lg bg-blue-900 controller-home p-6 rounded">
              <TextBox padding={3} callback={question} />
              <div className="flex">
                <div className="grow p-2">
                  <Controller />
                </div>
              </div>
            </div>
            {/* <button
              className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
              onClick={(e) => {
                handleCreateForm();
              }}
            >
              Create Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button> */}
          </>
        ) : (
          <></>
        )}

        {mode == "edit" ? (
          <>
            <div className="controller shadow-lg bg-blue-900 controller-home p-6 rounded">
              <TextBox padding={3} callback={question} />
              <div className="flex">
                <div className="grow p-2">
                  <Controller />
                </div>
              </div>
            </div>
            {/* <button
              className="drop-shadow-sm font-bold text-gray-50 bg-green-900 my-6 mx-auto"
              onClick={(e) => {
                handleModifyForm();
              }}
            >
              Save Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button> */}
          </>
        ) : (
          <></>
        )}
        {mode == "submit" ? (
          <button
            className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
            onClick={(e) => {
              console.log("create form was called");
              handleSubmit();
            }}
          >
            Submit &nbsp;
            <LockClosedIcon className="h-6 " />
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
