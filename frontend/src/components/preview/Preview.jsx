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
} from "../";
import { LockClosedIcon } from "@heroicons/react/solid/";
import {
  changePreviewComponents,
  createError,
} from "../../features/component/components";
import { setResponses } from "../../features/preview/preview";
import { getForm } from "../../axios/forms";
// import { textboxResponse } from "../../response/handlers";

// mode : preview,edit,customize
// preview : delete options and submit button to change response system to be added
// edit : inline edit options to be provied
// create : [] array and starts with redu
// submit : may be we will make another page for this
export default function Preview({ data = [], mode = "" }) {
  const [fetching, setfetching] = useState(false);
  let preview = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  preview = useSelector((state) => state.component.previewComponents);

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
      dispatch(changePreviewComponents(res.data[0].forms));
    } else {
      console.log("unable to fetch data");
    }
  };

  //for preview
  if (data.length > 0) {
    console.log("data is being passed", data);
    preview = data;
    // dispatch(changePreviewComponents(data));
  }
  let { id } = useParams();

  //   onchange function for options
  const optionsSelected = (data) => {
    console.log(data);
  };

  // handle submits of the form
  const handleCreateForm = async () => {
    var res = await createForm(preview);
    // if res is success redirect to other
    if (res.status == "success") {
      console.log("pushing into history should be redirect");
      changePreviewComponents(res.data);
      navigate(`/edit/${res.id}`);
    }
    // if error push error
  };
  // handle modify of the form
  const handleModifyForm = async () => {
    var res = await modifyForm(id, preview);
    // if res is success redirect to other
    if (res.status == "success") {
      console.log("pushing into history should be redirect");
      changePreviewComponents(res.data);
      dispatch(
        createError({ text: "data saved successfully!", type: "success" })
      );

      navigate(`/edit/${id}`);
    }
    // if error push error
  };
  //handle the submit method and send id
  var userResponse = useSelector((state) => state.preview.responses);
  const handleSubmit = async () => {
    var res = await submitForm({ formid: id, form: userResponse });
    console.log("This is the response from reques", res);
    if (res.data.status == "success") {
      console.log("pushing into history should be redirect");
      dispatch(
        createError({ text: "Your response was submitted!", type: "success" })
      );
    }
    navigate(`/forms`);
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
  //for textbox response
  let textboxResponse = (index) => {
    preview = preview;
  };

  // end of response functions

  //handle edit forms
  const handleEditForm = async () => {};
  if (fetching) return <>Your data is being fetched</>;

  return (
    <div className=" w-11/12 lg:max-w-6xl bg-grey-100 shadow-lg   preview ">
      <div className="title">
        <div className="content">
          <h1 className="text-4xl font-bold my-4">Title of the Form</h1>
          <h3>Some other information</h3>
        </div>
      </div>

      <div className="form-data"></div>

      {preview.length > 0 ? (
        <div className="p-6">
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
            <button
              className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
              onClick={(e) => {
                handleCreateForm();
              }}
            >
              Create Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button>
          ) : (
            <></>
          )}
          {mode == "edit" ? (
            <button
              className="drop-shadow-sm font-bold text-gray-50 bg-green-900 my-6 mx-auto"
              onClick={(e) => {
                handleModifyForm();
              }}
            >
              Save Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button>
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
      ) : (
        <Chips text="Added questions will appear here" />
      )}
    </div>
  );
}
