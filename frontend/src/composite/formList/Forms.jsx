import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import {
  getAllForm,
  deleteForm,
  getForm,
  allApproved,
} from "../../axios/forms";
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
import moment from "moment";
import { SelectPeople, Template } from "../";
import { SubmitModal } from "../../components";

export default function Forms({ mode = "" }) {
  const [loggedin, setloggedin] = useState(false);
  const [share, setshare] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [infoModal, setinfoModal] = useState(false);
  const getforms = async () => {
    console.log(mode);
    if (mode == "publish") {
      console.log("in publish mode");
      var newData = await allApproved();
      console.log(newData);
      setData([...newData.data.data]);
    } else {
      var newData = await getAllForm();
      console.log(newData);
      setData([...newData.data]);
    }

    console.log(newData);
    setData([...newData.data]);
  };

  // this function will handle the delete of form
  const handleDelete = async (id) => {
    var res = await deleteForm(id);
    if (res.data == "success") {
      dispatch(createError({ text: " deleted successfully", type: "warning" }));
      getforms();
    }
  };
  const [reason, setreason] = useState("");
  useEffect(() => {
    getforms();
  }, []);
  return (
    <div className="indexPage ">
      {infoModal ? (
        <>
          <SubmitModal
            close={() => {
              setinfoModal(!infoModal);
            }}
            mode="info"
            text={reason}
          />
        </>
      ) : (
        <></>
      )}
      <>
        {share ? (
          <>
            <SelectPeople
              closeSelect={() => {
                setshare(!share);
              }}
            />
          </>
        ) : (
          <></>
        )}
      </>
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
        <div className="container w-full mx-auto p-8 ">
          {data.length > 0 ? (
            <>
              <div className="p-3">
                {/* <h1 className="font-bold text-3xl text-gray-700 ">
                  List of all forms created:
                </h1> */}
              </div>
              <div className="w-full table-forms shadow-lg overflow-y-scroll flex flex-wrap">
                <table class="w-full   rounded shadow-lg">
                  <thead className="p-3 rounded ">
                    <tr className="bg-gray-900 text-blue-100">
                      <th align="center" className="p-3">
                        Index
                      </th>
                      <th className="p-3">Title</th>
                      {mode == "publish" ? (
                        <th className="p-3">FormID</th>
                      ) : (
                        <th className="p-3">Status</th>
                      )}
                      <th className="p-3">Created On</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i) => {
                      return (
                        <tr
                          className={`duration-150 ease-in-out  text-gray-800 ${
                            x.publish == "approved" ? "bg-green-100" : ""
                          } ${x.publish == "pending" ? "bg-yellow-100" : ""} ${
                            x.publish == "deapproved" ? "bg-red-200" : ""
                          } `}
                        >
                          <td align="center" className="p-3">
                            {i + 1}
                          </td>
                          <td align="center" className="p-3 font-bold">
                            {x.title.toUpperCase()}
                          </td>
                          <td align="center" className="p-3">
                            {mode == "publish" ? (
                              <span className={`chips bg-white font-bold `}>
                                {x.id}
                              </span>
                            ) : (
                              <span
                                className={`chips chips-${x.publish} font-bold `}
                                onClick={() => {
                                  if (x.publish == "deapproved") {
                                    setreason(x.reason);
                                    setinfoModal(!infoModal);
                                  }
                                }}
                              >
                                {x.publish == "approved"
                                  ? "Approved to Publish"
                                  : x.publish == "pending"
                                  ? "Sent for approval"
                                  : x.publish == "deapproved"
                                  ? "Changes Required"
                                  : "In Progress"}
                              </span>
                            )}

                            {/* {x.publish} */}
                          </td>
                          <td align="center" className="p-3">
                            {moment(x.createon, "YYYYMMDD")
                              .add(1, "days")
                              .format("MMM Do YY")}
                          </td>
                          <td
                            align="right"
                            className="p-3 flex flex-wrap flex-row-reverse "
                          >
                            <div className="flex ">
                              {mode !== "publish" ? (
                                <>
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
                                </>
                              ) : (
                                <></>
                              )}

                              {x.publish == "approved" && mode == "publish" ? (
                                // <Link
                                //   to={`/collect/response/${x.id}`}
                                //   target={"_blank"}
                                // >
                                <button
                                  className="drop-shadow-sm bg-orange-500 text-orange-100 mx-1 my-3 "
                                  onClick={(e) => {
                                    setshare(!share);
                                    dispatch(setPreviewFor(x.id));
                                  }}
                                  title="Users Response"
                                >
                                  <ShareIcon className="h-4 " />
                                </button>
                              ) : (
                                // </Link>
                                <></>
                              )}
                              {x.publish == "approved" && mode == "publish" ? (
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
                              {mode !== "publish" &&
                              x.publish !== "approved" &&
                              x.publish !== "pending" ? (
                                <>
                                  <Link to={`/edit/${x.id}`}>
                                    <button
                                      className="drop-shadow-sm bg-blue-900 text-blue-100 mx-1 my-3"
                                      onClick={(e) => {}}
                                    >
                                      <PencilIcon className="h-4 " />
                                    </button>
                                  </Link>
                                </>
                              ) : (
                                <></>
                              )}
                              {mode !== "publish" &&
                              x.publish !== "approved" &&
                              x.publish !== "pending" ? (
                                <>
                                  <button
                                    className="drop-shadow-sm bg-gray-50 mx-1 my-3 warning text-red-100"
                                    onClick={(e) => {
                                      handleDelete(x.id);
                                    }}
                                  >
                                    <TrashIcon className="h-4 " />
                                  </button>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
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
