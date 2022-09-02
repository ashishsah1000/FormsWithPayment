import React, { useState, useEffect } from "react";
import { allFormToApprove } from "../../axios/forms";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  TrashIcon,
  PrinterIcon,
  FolderAddIcon,
  EyeIcon,
  ShareIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid/";
export default function Check() {
  const [fetching, setFetching] = useState(true);
  const [data, setdata] = useState([]);
  const getPending = async () => {
    var res = await allFormToApprove();

    console.log(res.data);
    setdata(res.data.data);
    setFetching(false);
  };

  useEffect(() => {
    getPending();
  }, []);

  return (
    <div className="w-10/12 p-6 mx-auto shadow-sm">
      <div>
        {fetching ? (
          <>fetching data</>
        ) : (
          <>
            {data.length > 0 ? (
              <>
                <table class="table-auto w-full rounded">
                  <thead className="p-3 rounded">
                    <tr className="bg-blue-900 text-blue-100">
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
                        <tr className="hover:bg-blue-100 text-gray-800">
                          <td align="center" className="p-3">
                            {i + 1}
                          </td>
                          <td align="center" className="p-3 font-bold">
                            {x.title.toUpperCase()}
                          </td>
                          <td align="center" className="p-3">
                            {x.email}
                          </td>
                          <td align="center" className="p-3">
                            {x.createon}
                          </td>
                          <td align="right" className="p-3 flex flex-wrap ">
                            <div className="flex mx-auto">
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
              <>No data</>
            )}
          </>
        )}
      </div>
    </div>
  );
}
