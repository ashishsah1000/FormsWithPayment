import React, { useState, useEffect } from "react";
import Chips from "../chips/Chips";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createForm,
  modifyForm,
  submitForm,
  publishForm,
  approveForm,
  deapproveForm,
} from "../../axios/forms";
import { useNavigate, useParams } from "react-router-dom";

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
  AllCheckers,
  SubmitModal,
} from "../";
import {
  LockClosedIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid/";
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
  // data = [],
  mode = "",
  title = "This is title",
  description = "Here goes description",
}) {
  const [fetching, setfetching] = useState(false);
  const [inlineEdit, setinlineEdit] = useState([]);
  let preview = [];
  let copyPreview = [];
  let editarr = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  preview = useSelector((state) => state.component.previewComponents);
  const [mainTitle, settitle] = useState("");
  const [mainDescription, setdescription] = useState("");
  const [status, setStatus] = useState("");
  const [returnBack, setreturnBack] = useState(false);
  // reason to be used for getting any reason like deapprove form reason
  //
  // function to update question in redux;
  const question = (value) => {
    dispatch(addQuestion(value)); // this will dispatch the question value to redux
  };

  //fetch the data pf specific form
  const searchForm = async (id) => {
    setfetching(true);
    var res = await getForm(id);
    if (res.data.length == 0) {
      navigate("/forms");
      return 0;
    }
    if (res !== "error") {
      setfetching(false);
      settitle(res.data[0].title);
      setdescription(res.data[0].description);

      setStatus(res.data[0].publish);
      console.log("setting up the status", status);
      dispatch(changePreviewComponents(res.data[0].forms));
      copyPreview = [...res.data[0].forms];
    } else {
      console.log("unable to fetch data");
    }
  };

  let { id } = useParams();

  //   onchange function for options
  const optionsSelected = (data) => {};

  //handle the submit method and send id
  var userResponse = useSelector((state) => state.preview.responses);
  var userDetails = useSelector((state) => state.preview.userDetails);
  const handleSubmit = async () => {
    var res = await getForm(id);
    var realForm = res.data[0].forms;
    //user response redux is muted object so make a copy of data and check if section is present !
    var copyResponse = [...userResponse];
    for (var i = 0; i < realForm.length; i++) {
      if (realForm[i].type == "section") {
        copyResponse[i] = { ...realForm[i] };
      }
    }
    if (userDetails.email) {
      var res = await submitForm({
        formid: id,
        form: copyResponse,
        email: userDetails.email,
      });
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

  // this will handle publish section
  let approvers = "";
  const handlePublish = async (id) => {
    if (approvers.length == 0) {
      dispatch(createError({ text: "Please add approver", type: "warning" }));
    } else {
      var res = publishForm(id, approvers);
      navigate("/forms");
    }

    // console.log(res);
    // if (res.data.status == "success") {
    //   dispatch(
    //     createError({ text: "Submitted for publish!", type: "success" })
    //   );
    // } else {
    //   dispatch(createError({ text: "Some error happened", type: "warning" }));
    // }
  };
  //handle can be used to get the value of react selector
  const handleOptionChange = (selectedOption) => {
    approvers = selectedOption.map((x) => x.value).join(" ");
  };

  // handle approve only for the approver

  const handleApprove = async (id) => {
    var res = approveForm(id);
    console.log(res);
    navigate("/forms");
  };
  const handleDeapprove = async (id) => {
    var res = deapproveForm(id);
    console.log(res);
    navigate("/forms");
  };
  let reason = "";

  useEffect(() => {
    if (
      mode == "edit" ||
      mode == "submit" ||
      mode == "publish" ||
      mode == "approve"
    ) {
      const something = searchForm(id);
      console.log("something", something);
      if (something.length > 0)
        dispatch(changePreviewComponents(something.data));
    }
    if (mode == "create") {
      dispatch(changePreviewComponents([]));
    }
  }, []);
  console.log("mode is", mode);
  // edit mode inline

  // this section deals with response functions
  // store the form data in redux and update array with every change

  //dispatch response when responses array is needed
  // dispatch(setResponses(preview));
  const responses = useSelector((state) => state.preview.responses);

  // end of response functions

  if (fetching) return <>Your data is being fetched</>;

  return (
    <div className=" w-11/12 lg:max-w-6xl   preview ">
      <div className="previewEdit">
        <div className="title" style={{ marginTop: "40px" }}>
          <div className="content">
            <h1 className="text-4xl font-bold my-4">
              {mainTitle.length > 0 ? mainTitle : title}
            </h1>
            <h3>
              {mainDescription.length > 0 ? mainDescription : description}
            </h3>
          </div>
        </div>
        <div className="form-data"></div>
        <div className="rounded ">
          {preview.map((x, i) => {
            if (x.type == "rating") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Rating type={x.type} id={i} question={x.question} />
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "textarea") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Textarea
                    type={x.type}
                    id={i}
                    mode="submit"
                    callback={() => {}}
                  />
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "datepick") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <DatePick type={x.type} id={i} />
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "file") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <Files
                    type={x.type}
                    id={i}
                    mode={mode}
                    question={x.question}
                    formId={id}
                  />
                </div>
              );
            }
            if (x.type == "options") {
              return (
                <div className="preview-elements bg-gray-100 p-6">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <OptionView
                    array={x.options.data}
                    callback={optionsSelected}
                    type={x.type}
                    id={i}
                  />
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "radio") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <h1 className="font-bold">Question </h1> */}
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <RadioView
                    array={x.options.data}
                    callback={optionsSelected}
                    type={x.type}
                    id={i}
                  />
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "textbox") {
              return (
                <div className="preview-elements p-6 bg-gray-100">
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div>
                    {/* <h1 className="font-bold">Question </h1> */}
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
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
            if (x.type == "section") {
              return (
                <div
                  className={`preview-elements  sectionPreview mt-16`}
                  style={{
                    background: x.data.properties.background,
                    color: x.data.properties.color,
                  }}
                >
                  {mode == "edit" || mode == "create" ? (
                    <>
                      <div className="delete-holder">
                        <button
                          className="m-auto text-blue-500 font-bold"
                          onClick={() => {
                            if (!inlineEdit[i]) {
                              let copy = inlineEdit;
                              copy[i] = true;
                              setinlineEdit([...copy]);
                            } else {
                              let copy = inlineEdit;
                              copy[i] = null;
                              setinlineEdit([...copy]);
                            }
                          }}
                        >
                          <PencilIcon className="h-5" /> &nbsp; Edit
                        </button>
                        <Delete id={i} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <h1 className="text-4xl font-bold"> {x.question}</h1>
                  <h1 className="my-4 mx-3">{x.data.lable}</h1>
                  {inlineEdit[i] ? (
                    <div style={{ zIndex: 103 }}>
                      <Controller
                        mode="edit"
                        data={preview}
                        id={i}
                        classes="bg-gray-100"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            }
          })}

          {mode == "submit" ? (
            <button
              className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
              onClick={(e) => {
                handleSubmit();
              }}
            >
              Submit &nbsp;
              <LockClosedIcon className="h-5 " />
            </button>
          ) : (
            <></>
          )}
          {mode == "publish" ? (
            <>
              <hr />
              <br />
              <div className="w-96 mx-auto ">
                {status == "pending" || status == "approved" ? (
                  <></>
                ) : (
                  <AllCheckers callback={handleOptionChange} />
                )}
                {/* <AllCheckers callback={handleOptionChange} /> */}
              </div>
              <button
                className={`drop-shadow-sm font-bold text-gray-50 bg-violet-900 my-6 mx-auto  text-ellipsis whitespace-nowrap 
              ${status == "pending" || status == "approved" ? "bg-red-100" : ""}
              `}
                disabled={
                  status == "pending" || status == "approved" ? true : false
                }
                onClick={(e) => {
                  handlePublish(id);
                }}
              >
                &nbsp;Send for approval &nbsp;
                <LockClosedIcon className="h-5 " />
              </button>
            </>
          ) : (
            <></>
          )}
          {mode == "approve" ? (
            <>
              <button
                className={`drop-shadow-sm font-bold text-gray-50 bg-violet-900 my-6 mx-auto `}
                onClick={() => {
                  handleApprove(id);
                }}
              >
                &nbsp;Approve &nbsp;
                <CheckCircleIcon className="h-5 " />
              </button>
              <button
                className="drop-shadow-sm font-bold text-gray-50 bg-red-600 my-6 mx-auto"
                onClick={() => {
                  setreturnBack(!returnBack);
                  //handleDeapprove(id);
                }}
              >
                &nbsp;Send Back &nbsp;
                <ExclamationCircleIcon className="h-5 " />
              </button>
            </>
          ) : (
            <></>
          )}
          {returnBack ? (
            <>
              <SubmitModal
                text="Sure you want to deapprove this form?"
                close={() => setreturnBack(!returnBack)}
                callback={() => deapproveForm(id, reason)}
                reqReason={true}
                reasoncallback={(value) => {
                  reason = value;
                }}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {mode == "create" ? (
        <>
          <Controller />
        </>
      ) : (
        <></>
      )}

      {mode == "edit" ? (
        <>
          <Controller />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
