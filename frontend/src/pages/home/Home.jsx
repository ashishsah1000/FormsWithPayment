import React from "react";
import { Navbar, TextBox, Contorller } from "../../components";
import Controller from "../../components/controller/Controller";
import { PlusCircleIcon } from "@heroicons/react/solid/";

export default function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className="flex my-6">
          <div className="grow  mx-6">
            <div className="controller shadow-lg bg-white-500 w-full p-6">
              <TextBox />
              <div className="flex">
                <div className="grow p-2">
                  <Controller />
                </div>
                {/* <div className="addButton">
                  <button className="text-blue-900 m-full">
                    <PlusCircleIcon className="h-6 " /> &nbsp; Add Element
                  </button>
                </div> */}
              </div>
            </div>
            <div className="preview w-full my-6 bg-white-500 my-6">
              <TextBox mode="show" />
            </div>
          </div>
          <div className="flex-none w-1/5 h-14 bg-blue-300 mx-6">03</div>
        </div>
      </div>
    </div>
  );
}
