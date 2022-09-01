import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getAllForm, deleteForm, getForm } from "../../axios/forms";
import {
  PencilIcon,
  TrashIcon,
  PrinterIcon,
  FolderAddIcon,
  EyeIcon,
  ShareIcon,
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
    console.log(newData);
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
      <div className="create-new ">
        <Link to="/create">
          <button
            className=" drop-shadow-sm bg-red-500 mx-auto my-3  text-gray-100"
            onClick={(e) => {}}
            title="New Form"
          >
            <FolderAddIcon className="h-6 " />
          </button>
        </Link>
      </div>
      {data != "error" ? (
        <div className="container w-full mx-auto p-8">
          {data.length > 0 ? (
            <>
              <div className="p-3">
                {/* <h1 className="font-bold text-3xl text-gray-700 ">
                  List of all forms created:
                </h1> */}
              </div>
              <div className="w-full flex flex-wrap">
                {data.map((x) => {
                  return (
                    <div
                      className={`mx-auto text-gray-700 w-96 flex flex-col forms-tiles hover:animate-glow p-2 my-3 rounded drop-shadow-lg ${x.publish}`}
                    >
                      <div className="grow  p-3 font-bold text-xl">
                        {x.title ? x.title : "No title"}
                        <br></br>
                        <span className="text-sm text-gray-900 font-thin">
                          <b>Created On</b> : {x.createon}
                        </span>
                      </div>
                      <div className="index-button flex felx-wrap">
                        <div className="grow flex flex-wrap ">
                          <Link to={`/preview/${x.id}`}>
                            <button
                              className="drop-shadow-sm bg-gray-50 mx-1 my-3"
                              onClick={(e) => {
                                dispatch(setPreviewFor(x.id));
                              }}
                              title="admin response"
                            >
                              <PrinterIcon className="h-4 " />
                            </button>
                          </Link>
                          {x.publish == "true" ? (
                            <Link
                              to={`/collect/response/${x.id}`}
                              target={"_blank"}
                            >
                              <button
                                className="drop-shadow-sm bg-orange-700 text-orange-100 mx-1 my-3 "
                                onClick={(e) => {
                                  dispatch(setPreviewFor(x.id));
                                }}
                                title="Users Response"
                              >
                                <ShareIcon className="h-4 " />
                              </button>
                            </Link>
                          ) : (
                            <></>
                          )}
                          {x.publish == "true" ? (
                            <Link to={`/all/response/${x.id}`}>
                              <button
                                className="drop-shadow-sm bg-green-700 text-blue-100 mx-1 my-3"
                                onClick={(e) => {}}
                              >
                                <EyeIcon className="h-4 " />
                              </button>
                            </Link>
                          ) : (
                            <></>
                          )}

                          <Link to={`/edit/${x.id}`}>
                            <button
                              className="drop-shadow-sm bg-blue-900 text-blue-100 mx-1 my-3"
                              onClick={(e) => {}}
                            >
                              <PencilIcon className="h-4 " />
                            </button>
                          </Link>
                        </div>
                        <div>
                          <button
                            className="drop-shadow-sm bg-gray-50 mx-1 my-3 warning text-red-100"
                            onClick={(e) => {
                              handleDelete(x.id);
                            }}
                          >
                            <TrashIcon className="h-4 " />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
