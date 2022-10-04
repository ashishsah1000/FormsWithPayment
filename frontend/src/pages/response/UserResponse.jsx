import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../../components/";
import MainPreview from "../Routes/MainPreview";
import { checkUserData } from "../../axios/response";
import "./user-response.css";
import { createError } from "../../features/component/components";
import { setUserDetails } from "../../features/preview/preview";
import { ArrowCircleRightIcon } from "@heroicons/react/solid/";
export default function UserResponse() {
  const [username, setusername] = useState("");
  const [checked, setchecked] = useState(false);

  const dispatch = useDispatch();
  // check if the user has already responded
  let { id } = useParams();
  const checkData = async () => {
    if (username.length > 1) {
      var data = {
        username: username,
      };
      var res = await checkUserData(id, data);
      console.log(res);
      if (res.status == "failed") {
        dispatch(
          createError({
            text: res.data,
            type: "alarm",
          })
        );
      } else if (res.email) {
        dispatch(setUserDetails(res));
        dispatch(
          createError({
            text: "Please do not refresh the page!",
            type: "alarm",
          })
        );
      } else {
        setchecked(true);
        dispatch(
          createError({ text: "New response. Click on next!", type: "cold" })
        );
      }
    } else {
      dispatch(
        createError({ text: "Please enter a valid email!", type: "warning" })
      );
    }
  };

  // got the user details search by form id and bring the form
  const details = useSelector((state) => state.preview.userDetails);
  console.log("the details", details);

  if (details.email) {
    return (
      <div className="get-response">
        <MainPreview />
      </div>
    );
  }

  return (
    <div className="get-response">
      <div className="w-1/2 p-6 bg-gray-100 m-auto shadow-xl mt-36 rounded">
        <h1 className="text-2xl mx-auto my-3 font-thin text-blue-900">
          {" "}
          Enter email to respond:
        </h1>
        <input
          type="email"
          placeholder="enter your email"
          onChange={(e) => setusername(e.target.value)}
          className="w-full m-auto border border-sky-500 p-3 my-3 rounded font-thin"
          required="true"
        />
        {checked ? (
          <button
            className="mx-auto my-3 bg-blue-800 text-blue-200 font-bold"
            onClick={() => {
              console.log(
                "call for checking if user has responded and get the details if responded!"
              );
              checkData();
            }}
          >
            &nbsp;Next <ArrowCircleRightIcon className="h-6  mx-1" />
          </button>
        ) : (
          <button
            className="mx-auto my-3 bg-green-800 text-green-200 font-bold"
            onClick={() => {
              console.log(
                "call for checking if user has responded and get the details if responded!"
              );
              checkData();
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
