import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import {
  ArchiveIcon,
  CogIcon,
  PencilIcon,
  ClipboardDocument,
} from "@heroicons/react/solid/";
import { logOut } from "../../axios/users";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../features/component/components";
import { deleteUser, getUser } from "../../localStorage/users";
import { useEffect } from "react";

export default function Navbar({
  profileImage = "https://picsum.photos/300/300",
}) {
  var user = getUser();

  var dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    // deleteUser();
    const res = await logOut();
    console.log(res);
    if (res.status == "success") {
      dispatch(createError({ text: res.text, type: "success" }));
      navigate("/");
    }
    if (res.status == "failure")
      dispatch(createError({ text: res.text, type: "warning" }));
  };
  if (user == null) {
    user = { username: "", role: "" };
  }
  useEffect(() => {
    user = getUser();
  }, []);
  return (
    <div className="shadow-lg max-w-full h-16 bg-blue-500 flex navbar">
      <div className="flex-none w-14 h-14 logo">
        <h1 className="font-bold text-lg ml-6 text-blue-200">Forms</h1>
      </div>
      <div className="grow h-14 options"></div>
      <div className=" profile mx-6">
        <div className="m-auto flex flex-wrap text-blue-200">
          <button className="mx-3">
            <Link to="/forms">
              <ArchiveIcon className="h-6  mx-3" />
            </Link>
          </button>
          {user?.role == "checker" || user.role == "admin" ? (
            <button className="mx-3">
              <Link to="/check/all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                  />
                </svg>
              </Link>
            </button>
          ) : (
            <></>
          )}

          {user?.role == "admin" ? (
            <button className="mx-3">
              <Link to="/users/all">
                <CogIcon className="h-6  mx-3" />
              </Link>
            </button>
          ) : (
            <></>
          )}

          <button
            onClick={() => {
              handleLogOut();
            }}
            className="mx-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </button>
          <button className="mx-3">
            <Link to="/forms">
              {user.username.length > 0
                ? user?.username.toUpperCase()
                : "Log in"}
            </Link>
          </button>
        </div>
        <img src={profileImage} className="h-12 rounded-full"></img>
      </div>
    </div>
  );
}
