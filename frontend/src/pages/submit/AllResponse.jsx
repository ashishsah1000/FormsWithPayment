import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";

import { useParams } from "react-router-dom";
import { getAllResponse, deleteResponse } from "../../axios/forms";
import { EyeIcon, TrashIcon } from "@heroicons/react/solid/";
import { createError } from "../../features/component/components";
export default function AllResponse() {
  const [data, setData] = useState([]);

  let { id } = useParams();
  var dispatch = useDispatch();

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
  // handle delete of a response
  const handleDelete = async (id) => {
    var res = await deleteResponse(id);
    console.log(
      "🚀 ~ file: Forms.jsx ~ line 27 ~ handleDelete ~ res",
      res.data
    );
    if (res.data == "success") {
      dispatch(createError({ text: " deleted successfully", type: "warning" }));
      fetchData();
    }
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
              <div className="w-10/12 mx-auto flex  bg-blue-300 p-2 my-3 rounded">
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
                <button
                  className="drop-shadow-sm bg-red-900 text-red-100 mx-1 my-3"
                  onClick={(e) => {
                    handleDelete(x.id);
                  }}
                >
                  <TrashIcon className="h-6 " />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div>
      <>
        <div className="p-3">
          <div className="m-auto empty-image">
            <img src="/images/3169210.jpg" alt="" />
          </div>
          <h1 align="center" className=" text-xl text-red-300 ">
            Responses will appere here!
          </h1>
        </div>
      </>
    </div>
  );
}
