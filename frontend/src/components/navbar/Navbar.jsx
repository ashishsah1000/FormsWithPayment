import React from "react";
import "./navbar.css";
import { Link, Route, Routes } from "react-router-dom";
import { ArchiveIcon, CogIcon, PencilIcon } from "@heroicons/react/solid/";

export default function Navbar({
  profileImage = "https://picsum.photos/300/300",
}) {
  return (
    <div className="shadow-lg max-w-full h-16 bg-blue-500 flex navbar">
      <div className="flex-none w-14 h-14 logo">
        <h1 className="font-bold text-lg ml-6 text-blue-200">Forms</h1>
      </div>
      <div className="grow h-14 options"></div>
      <div className=" profile mx-6">
        <div className="m-auto flex flex-wrap text-blue-200">
          <Link to="/create">
            <PencilIcon className="h-6  mx-3" />
          </Link>
          <Link to="/forms">
            <ArchiveIcon className="h-6  mx-3" />
          </Link>
          <Link to="/forms">
            <CogIcon className="h-6  mx-3" />
          </Link>
        </div>
        <img src={profileImage} className="h-12 rounded-full"></img>
      </div>
    </div>
  );
}
