import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/";
import { getAllUser } from "../../axios/users";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../features/component/components";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/solid/";
import { Link } from "react-router-dom";

// get all the users from axios
export default function Users() {
  // this will show users and provide options to delete and add a user
  const [data, setdata] = useState("");
  const dispatch = useDispatch();
  const getData = async () => {
    var res = await getAllUser();
    if (res.status == "success") {
      dispatch(
        createError({
          type: "success",
          text: "data recived successfully",
        })
      );
      setdata(res.data);
      console.log(data);
    } else {
      dispatch(
        createError({
          type: "warning",
          text: "Some error happened",
        })
      );
    }
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="users-list w-10/12  m-auto">
      <Link to="/admin/register">
        <button className="bg-red-700 text-red-100 hover:bg-red-800 px-3 mx-3 my-3">
          <PlusCircleIcon className="h-6" /> &nbsp; Add new user
        </button>
      </Link>
      {data.length > 0 ? (
        <>
          <div>
            {/* <div className="flex w-full flex-wrap shadow-md bg-gray-900 text-gray-100 font-bold my-2">
              <div className="p-3">S.No</div>
              <div className="p-3">Username</div>
              <div className="p-3">Created On</div>
              <div className="p-3">Role</div>
            </div> */}
            {data.map((x, i) => {
              return (
                <div className="flex w-full flex-wrap shadow-md bg-gray-50 hover:bg-violet-100 text-gray-800  my-2">
                  <div className="grow flex">
                    <div className="p-3 mr-6">{i + 1}</div>
                    <div className="p-3 mr-6 font-bold">{x.username}</div>
                    <div className="p-3 mr-6 ">{x.email}</div>
                    <div className="p-3 mr-6">{x.created_on}</div>
                    <div className="p-3 mr-6">{x.role}</div>
                  </div>
                  <div>
                    <button>
                      <TrashIcon className="h-6 text-red-700 hover:animate-bounce" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>No data available in users</>
      )}
    </div>
  );
}
