import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

import { useParams } from "react-router-dom";
import { getAllResponse } from "../../axios/forms";
import { EyeIcon } from "@heroicons/react/solid/";

export default function AllResponse() {
  const [data, setData] = useState([]);
  let { id } = useParams();
  const fetchData = async () => {
    var newData = await getAllResponse(id);
    console.log(
      "🚀 ~ file: Forms.jsx ~ line 22 ~ getforms ~ newData",
      newData,
      "where id is",
      id
    );

    setData([...newData.data]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (data.length > 0) {
    return (
      <div>
        <div className="indexPage ">
          {data.map((x) => {
            return (
              <div className="w-10/12 mx-auto flex bg-green-100 p-2 my-3 rounded">
                <div className="grow  p-3 font-bold ">
                  Submitted by <span className="text-red-500">{x.email}</span>
                  <br></br>
                  <span className="text-sm font-thin">
                    <b>Created On</b> : {x.createon}
                  </span>
                </div>
                <Link to={`/response/${x.id}`}>
                  <button
                    className="drop-shadow-sm bg-green-900 text-green-100 mx-1 my-3"
                    onClick={(e) => {}}
                  >
                    <EyeIcon className="h-6 " />
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div>AllResponse</div>;
}
