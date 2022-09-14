import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LockClosedIcon } from "@heroicons/react/solid/";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import {
  changePreviewComponents,
  createError,
  addQuestion,
} from "../../features/component/components";
import { createForm, modifyForm, submitForm, getForm } from "../../axios/forms";

export default function Publish({ mode = "" }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  let preview = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  preview = useSelector((state) => state.component.previewComponents);

  let { id } = useParams();

  // handle submits of the form
  const handleCreateForm = async () => {
    // pass preview if you want to store the existing data
    var res = await createForm(title, description, []);
    // if res is success redirect to other
    console.log("we are responding", res);
    if (res.status == "success") {
      console.log("pushing into history should be redirect");
      // changePreviewComponents(res.data);
      navigate(`/edit/${res.id}`);
      // navigate(`/forms`);
      dispatch(
        createError({ text: "Form created successfully!", type: "success" })
      );
    }
    // if error push error
  };
  // handle modify of the form
  const handleModifyForm = async () => {
    var res = await modifyForm(id, preview, title, description);
    // if res is success redirect to other
    if (res.status == "success") {
      console.log("pushing into history should be redirect");
      changePreviewComponents(res.data);
      dispatch(
        createError({ text: "data saved successfully!", type: "success" })
      );

      navigate(`/forms`);
    }
    // if error push error
  };

  //fetch the data pf specific form
  const searchForm = async () => {
    var res = await getForm(id);
    console.log(res);
    settitle(res.data[0].title);
    setdescription(res.data[0].description);
  };
  useEffect(() => {
    searchForm();
  }, []);

  return (
    <>
      <div className="mt-6 p-3 mx-auto">
        <h1 className="text-2xl font-thin my-6 text-gray-500 " align="center">
          Create / Modify / Udpate a form
        </h1>

        <input
          className="p-3 m-auto w-11/12 border focus:border-blue-900 border-gray-300 ease-in duration-300  rounded"
          type="text"
          placeholder="Form title"
          maxlength="50"
          defaultValue={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <textarea
          className="w-11/12 mt-3 p-3 text-sm border focus:border-blue-900 border-gray-300 ease-in duration-300  rounded"
          placeholder="Enter description"
          defaultValue={description}
          onChange={(e) => setdescription(e.target.value)}
          maxlength="150"
        />
        {mode == "create" ? (
          <>
            <button
              className="drop-shadow-sm font-bold text-gray-50 bg-blue-900 my-6 mx-auto"
              onClick={(e) => {
                handleCreateForm();
              }}
            >
              Create Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button>
          </>
        ) : (
          <></>
        )}
        {mode == "edit" ? (
          <>
            <button
              className="drop-shadow-sm font-bold text-gray-50 bg-green-900 my-6 mx-auto"
              onClick={(e) => {
                handleModifyForm();
              }}
            >
              Save Form &nbsp;
              <LockClosedIcon className="h-6 " />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
