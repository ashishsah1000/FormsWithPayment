import React from "react";
import { PaperClipIcon } from "@heroicons/react/solid/";

export default function Files() {
  return (
    <div className="my-6 mx-6">
      <input type="file" name="uploadFile"></input>
      <label for="uploadFile">
        <span className="flex my-2">
          <PaperClipIcon className="h-6 " /> &nbsp;Select your file
        </span>
      </label>
    </div>
  );
}
