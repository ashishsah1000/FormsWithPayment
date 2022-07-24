import React from "react";
import "./navbar.css";

export default function Navbar({
  profileImage = "https://picsum.photos/300/300",
}) {
  return (
    <div className="shadow-lg max-w-full h-16 bg-blue-500 flex navbar">
      <div class="flex-none w-14 h-14 logo">
        <h1>LOGO</h1>
      </div>
      <div class="grow h-14 options">Publish / Unpublish</div>
      <div class="flex-none w-14 h-14 profile">
        <img src={profileImage} className="h-12 rounded-full"></img>
      </div>
    </div>
  );
}
