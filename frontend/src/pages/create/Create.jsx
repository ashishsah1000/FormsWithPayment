import React from "react";
import "./create.css";
import { Publish } from "../../components";

export default function Create() {
  return (
    <div className="mt-6">
      <div className="w-2/3 mx-auto shadow-lg flex flex-wrap rounded mt-24">
        <div className="w-2/3 p-6 ">
          <Publish mode="create" />
        </div>
        <div className="w-1/3 rounded">
          <img src="/images/create.jpeg" className="rounded" />
        </div>
      </div>
    </div>
  );
}
