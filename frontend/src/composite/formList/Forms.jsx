import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getAllForm, deleteForm, getForm } from "../../axios/forms";
import {
  PencilIcon,
  TrashIcon,
  PrinterIcon,
  FolderAddIcon,
  EyeIcon,
} from "@heroicons/react/solid/";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { previewSlice, setPreviewFor } from "../../features/preview/preview";
import { createError } from "../../features/component/components";

export default function Forms() {
  const [loggedin, setloggedin] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getforms = async () => {
    var newData = await getAllForm();
    console.log(newData.data);
    setData([...newData.data]);
  };

  // this function will handle the delete of form
  const handleDelete = async (id) => {
    var res = await deleteForm(id);
    console.log(
      "🚀 ~ file: Forms.jsx ~ line 27 ~ handleDelete ~ res",
      res.data
    );
    if (res.data == "success") {
      dispatch(createError({ text: " deleted successfully", type: "warning" }));
      getforms();
    }
  };
  useEffect(() => {
    getforms();
  }, []);
  return (
    <div className="indexPage ">
      <div className="create-new w-full">
        <Link to="/create">
          <button
            className=" drop-shadow-sm bg-gray-50 mx-auto my-3 cold text-gray-100"
            onClick={(e) => {}}
          >
            <FolderAddIcon className="h-6 " />
            &nbsp; Add new form
          </button>
        </Link>
      </div>
      {data != "error" ? (
        <div className="container w-full mx-auto p-8">
          {data.length > 0 ? (
            <>
              <div className="p-3">
                <h1 className="font-bold text-3xl ">
                  List of all forms created:
                </h1>
              </div>
              {data.map((x) => {
                return (
                  <div className="mx-auto flex bg-blue-100 p-2 my-3 rounded">
                    <div className="grow  p-3 font-bold ">
                      {x.title ? x.title : "No title"}
                      <br></br>
                      <span className="text-sm font-thin">
                        <b>Created On</b> : {x.createon}
                      </span>
                    </div>
                    <div className="index-button flex felx-wrap">
                      <Link to={`/preview/${x.id}`}>
                        <button
                          className="drop-shadow-sm bg-gray-50 mx-1 my-3"
                          onClick={(e) => {
                            dispatch(setPreviewFor(x.id));
                          }}
                        >
                          <PrinterIcon className="h-6 " />
                        </button>
                      </Link>
                      <Link to={`/all/response/${x.id}`}>
                        <button
                          className="drop-shadow-sm bg-green-700 text-blue-100 mx-1 my-3"
                          onClick={(e) => {}}
                        >
                          <EyeIcon className="h-6 " />
                        </button>
                      </Link>
                      <Link to={`/edit/${x.id}`}>
                        <button
                          className="drop-shadow-sm bg-blue-900 text-blue-100 mx-1 my-3"
                          onClick={(e) => {}}
                        >
                          <PencilIcon className="h-6 " />
                        </button>
                      </Link>

                      <button
                        className="drop-shadow-sm bg-gray-50 mx-1 my-3 warning text-red-100"
                        onClick={(e) => {
                          handleDelete(x.id);
                        }}
                      >
                        <TrashIcon className="h-6 " />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="p-3">
                <div className="m-auto empty-image">
                  <img src="/images/3169210.jpg" alt="" />
                </div>
                <h1 align="center" className=" text-xl text-red-300 ">
                  Lets add some forms!
                </h1>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="p-6">Fetching your data</div>
      )}
    </div>
  );
}
