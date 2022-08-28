import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid/";
import {
  changePreviewComponents,
  createError,
} from "../../features/component/components";

//id refers to the index of the element

export default function Delete({ id = "" }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.component.previewComponents);

  //   filter method to check index true or false
  let index = 0;
  let filterIndex = (item) => {
    if (index == id) {
      console.log("indexis ", index);
      index++;
      return false;
    } else {
      index++;
      return true;
    }
  };
  const deleteElement = () => {
    console.log("id is ", id);
    // if (id == "") {
    //   dispatch(createError({ type: "warning", text: "Invalid element" }));
    // } else {
    let arr = data.filter(filterIndex);
    index = 0;
    console.log(arr);
    dispatch(changePreviewComponents(arr));
    // }
  };
  return (
    <div>
      <div className="w-full flex justify-items-center">
        <div className="m-auto">
          <span>
            <button
              onClick={() => {
                deleteElement(id);
                console.log(id);
              }}
            >
              <TrashIcon className="text-red-500 h-6 deleteInputIcon mt-5" />
              <span className="mt-5 text-red-400 font-bold">
                &nbsp;Delete This Section
              </span>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
