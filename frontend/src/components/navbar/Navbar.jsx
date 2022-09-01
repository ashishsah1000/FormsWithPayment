import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { ArchiveIcon, CogIcon, PencilIcon } from "@heroicons/react/solid/";
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
          {user?.role == "admin" ? (
            <button className="mx-3">
              <Link to="/users/all">
                <CogIcon className="h-6  mx-3" />
              </Link>
            </button>
          ) : (
            <></>
          )}
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
