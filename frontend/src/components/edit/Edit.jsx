import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid/";
import {
  changePreviewComponents,
  createError,
} from "../../features/component/components";
import { Controller } from "../";

export default function Edit() {
  return (
    <div className="full-edit">
      <div className="w-1/2 m-auto mt-36 rounded bg-gray-50">
        <Controller />
      </div>
    </div>
  );
}
