import React from "react";
import { Preview } from "../../components/";
import { useSelector } from "react-redux";

export default function MainPreview({ data = [] }) {
  console.log(data);
  return (
    <div>
      <div className="flex flex-wrap my-6">
        <Preview data={data} />
      </div>
    </div>
  );
}
