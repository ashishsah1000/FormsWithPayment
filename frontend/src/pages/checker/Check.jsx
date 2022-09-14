import React, { useState, useEffect } from "react";
import { allFormToApprove } from "../../axios/forms";
import { Link } from "react-router-dom";
import moment from "moment";

import {
  CheckCircleIcon,
  TrashIcon,
  PrinterIcon,
  FolderAddIcon,
  EyeIcon,
  ShareIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid/";
import { getUser } from "../../localStorage/users";
export default function Check() {
  const [fetching, setFetching] = useState(true);
  const [data, setdata] = useState([]);
  const getPending = async () => {
    var appoint = [];
    var arr = [];
    var res = await allFormToApprove();
    for (var i = 0; i < res.data.data.length; i++) {
      var x = res.data.data[i].appointed_to;
      if (x == null) {
      } else {
        appoint = x.split(" ");
        if (appoint.includes(user.username)) {
          arr.push(res.data.data[i]);
        }
      }
    }
    setdata([...arr]);
    setFetching(false);
  };
  var user = getUser();
  useEffect(() => {
    getPending();
  }, []);

  return (
    <div className="w-10/12 p-6 mx-auto ">
      <div>
        {fetching ? (
          <>fetching data</>
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <table class="table-auto w-full rounded shadow-lg">
                  <thead className="p-3 rounded">
                    <tr className="bg-blue-500 text-blue-100">
                      <th align="center" className="p-3">
                        Index
                      </th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Created By</th>
                      <th className="p-3">Created On</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((x, i) => {
                      return (
                        <tr className="duration-150 ease-in-out hover:bg-blue-100 text-gray-800">
                          <td align="center" className="p-3 font-bold">
                            {i + 1}
                          </td>
                          <td align="center" className="p-3 font-bold">
                            {x.title.toUpperCase()}
                          </td>
                          <td align="center" className="p-3">
                            {x.email}
                          </td>
                          <td align="center" className="p-3">
                            {moment(x.createon, "YYYYMMDD")
                              .add(1, "days")
                              .format("MMM Do YY")}
                          </td>
                          <td
                            align="right"
                            className="p-3 flex flex-wrap flex-row-reverse "
                          >
                            <div className="flex ">
                              <Link to={`/approve/preview/${x.id}`}>
                                <button className="drop-shadow-sm bg-gray-50 mx-1 my-3 bg-blue-700 text-blue-100">
                                  <PrinterIcon className="h-4 " />
                                </button>
                              </Link>
                              <button className="drop-shadow-sm bg-gray-50 mx-1 my-3 bg-green-700 text-green-100">
                                <CheckCircleIcon className="h-4 " />
                              </button>
                              <button className="drop-shadow-sm bg-gray-50 mx-1 my-3 warning text-red-100">
                                <TrashIcon className="h-4 " />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div className="mx-auto flex flex-wrap justify-center">
                  <img src="/images/file.jpg" alt="" width="400px" />
                </div>
                <h1
                  className="text-orange-300 font-thin text-3xl"
                  align="center"
                >
                  No Appointed forms
                </h1>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
