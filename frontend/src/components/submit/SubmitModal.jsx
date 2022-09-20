import React from "react";
import { XCircleIcon, PaperAirplaneIcon } from "@heroicons/react/solid/";
import "./submit.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createError } from "../../features/component/components";
import { useNavigate } from "react-router-dom";

export default function SubmitModal({
  text = "Are you sure?",
  callback = () => {},
  close = () => {},
  reqReason = false,
  needButton = true,
  reasoncallback = () => {},
  mode = "",
}) {
  const [reason, setreason] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="people-modal text-gray-600 ">
      <div className="h-96 w-1/2 bg-white mx-auto mt-48 p-6 rounded">
        <div className="absolute  w-1/2 flex flex-row-reverse">
          <button
            className="mr-8"
            onClick={() => {
              close();
            }}
          >
            {" "}
            <XCircleIcon className="h-6 hover:text-red-500" />
          </button>
        </div>
        {mode != "info" ? (
          <>
            <div className="flex">
              <h1 className="text-4xl font-thin ml-3" align="center">
                {text}
              </h1>
            </div>
            {reqReason ? (
              <>
                <div className="reason flex justify-center my-8">
                  <textarea
                    name="reason"
                    id=""
                    cols="60"
                    rows="5"
                    className="p-6 font-thin"
                    placeholder="Any reason?"
                    maxLength={100}
                    onChange={(e) => {
                      setreason(e.target.value);
                      reasoncallback(e.target.value);
                    }}
                  ></textarea>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex justify-center">
              {needButton ? (
                <>
                  <button
                    className=" bg-blue-500 text-blue-100"
                    onClick={() => {
                      if (reqReason) {
                        if (reason.length > 0) {
                          callback();
                          dispatch(
                            createError({
                              text: "Action was completed successfully",
                              type: "success",
                            })
                          );
                          navigate("/check/all");
                        } else {
                          dispatch(
                            createError({
                              text: "Please specify the reason",
                              type: "warning",
                            })
                          );
                        }
                      } else {
                        callback();
                        dispatch(
                          createError({
                            text: "Action was completed successfully",
                            type: "success",
                          })
                        );
                        navigate("/check/all");
                      }
                    }}
                  >
                    {" "}
                    &nbsp; Submit &nbsp;
                    <span style={{ transform: "rotate(90deg)" }}>
                      <PaperAirplaneIcon className="h-6" />
                    </span>
                  </button>
                  {/* <button
            className=" bg-red-500 text-red-100 mx-3"
            onClick={() => {
              close();
            }}
          >
            {" "}
            &nbsp; Cancel &nbsp;
            <span style={{ transform: "rotate(90deg)" }}>
              <XCircleIcon className="h-6" />
            </span>
          </button> */}
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        ) : (
          <>
            {/* if mode is in info */}
            <div className="p-6 mt-auto flex">
              <div className="grow">
                <img width={600} src="/images/error.jpg" alt="" />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-red-600 mt-4">
                  {" "}
                  Seems like your form got deapproved!
                </h1>
                <h1 className="text mt-4 font-bold">
                  Reason : <sapn className="font-thin">{text}</sapn>
                </h1>
                <h1 className=" chips chips-pending font-thin mt-8">
                  You can always edit and republish!
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
