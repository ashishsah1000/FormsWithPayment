import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/";
import { getAllUser } from "../../axios/users";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../features/component/components";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/solid/";
import { Link } from "react-router-dom";
import { deleteSpecificUser } from "../../axios/users";
import { getUser } from "../../localStorage/users";
import moment from "moment";
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
  // delete a user if admin has the authority
  const deleteUser = async (id) => {
    var res = await deleteSpecificUser(id);
    if (res.status == "success") {
      dispatch(
        createError({
          type: "success",
          text: res.text,
        })
      );
      getData();
    } else {
      dispatch(
        createError({
          type: "warning",
          text: res.text,
        })
      );
    }
  };

  var user = getUser();

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="users-list w-10/12  m-auto">
      <Link to="/admin/register">
        <button className=" text-blue-500 hover:text-red-500 px-3 mx-3 my-3  duration-250 ease-in-out">
          <PlusCircleIcon className="h-6" /> &nbsp; Add new user
        </button>
      </Link>
      {data.length > 0 ? (
        <>
          <div className="shadow-lg">
            {/* <div className="flex w-full flex-wrap shadow-md bg-gray-900 text-gray-100 font-bold my-2">
              <div className="p-3">S.No</div>
              <div className="p-3">Username</div>
              <div className="p-3">Created On</div>
              <div className="p-3">Role</div>
            </div> */}
            <table class="table-auto w-full rounded">
              <thead className="p-3 rounded">
                <tr className="bg-blue-400 text-gray-100">
                  <th align="center" className="p-3">
                    Index
                  </th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Created On</th>
                  <th className="p-3">Roles</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((x, i) => {
                  if (x.username !== user.username)
                    return (
                      <tr>
                        <td align="center" className="p-3 mr-6">
                          {i + 1}
                        </td>
                        <td align="center" className="p-3 mr-6 font-bold">
                          {x.username}
                        </td>
                        <td align="center" className="p-3 mr-6 ">
                          {moment(x.created_on, "YYYYMMDD")
                            .add(1, "days")
                            .format("MMM Do YY")}
                        </td>
                        <td align="center" className="p-3 mr-6">
                          {x.role}
                        </td>
                        <td align="center" className="p-3 mr-6">
                          <div className="flex flex-row-reverse hover:animate-bounce">
                            <button
                              className="bg-red-400"
                              onClick={() => {
                                deleteUser(x.user_id);
                              }}
                            >
                              <TrashIcon className="h-6 text-gray-100 " />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>No data available in users</>
      )}
    </div>
  );
}
