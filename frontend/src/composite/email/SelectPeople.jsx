import React, { useState } from "react";
import "./email.css";
import Select from "react-select";

import { XCircleIcon, PaperAirplaneIcon } from "@heroicons/react/solid/";

import * as xlsx from "xlsx";
export default function SelectPeople({ closeSelect = () => {} }) {
  const [contacts, setcontacts] = useState([]);
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        var c = json.map((x) => {
          return { value: x.Age, label: x.Country };
        });
        console.log([...c]);

        setcontacts([...c]);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <div className="people-modal text-gray-600 ">
      <div className="h-96 w-1/2 bg-gray-100 mx-auto mt-48 p-6 rounded">
        <div className="absolute  w-1/2 flex flex-row-reverse">
          <button
            className="mr-8"
            onClick={() => {
              closeSelect();
            }}
          >
            {" "}
            <XCircleIcon className="h-6 hover:text-red-500" />
          </button>
        </div>
        <h1 className="text-4xl font-thin ml-3">How it works ?</h1>

        <div className="flex w-full p-3">
          <span className="font-thin text-sm">
            Select the excel file that contains all the users whom you want to
            share...
            <input
              type="file"
              webkitdirectory
              onChange={(e) => {
                readUploadFile(e);
              }}
            />
          </span>
        </div>
        <div className="select-people p-3">
          {contacts.length > 0 ? (
            <>
              <Select
                placeholder="Select people "
                options={contacts}
                className="font-thin"
                isMulti
                closeMenuOnSelect={false}
                onChange={() => {}}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        {contacts.length > 0 ? (
          <>
            <div className="flex flex-row-reverse p-3">
              <button
                className=" bg-blue-500 text-blue-100"
                onClick={() => {
                  closeSelect();
                }}
              >
                {" "}
                &nbsp; Send &nbsp;
                <span style={{ transform: "rotate(90deg)" }}>
                  <PaperAirplaneIcon className="h-6" />
                </span>
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
