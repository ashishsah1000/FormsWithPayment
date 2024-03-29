import React, { useState } from "react";
import "./email.css";
import Select from "react-select";
import Teamplate from "../template/Teamplate";
import { sendMail } from "../../axios/mail";
import { XCircleIcon, PaperAirplaneIcon } from "@heroicons/react/solid/";
import { useSelector, useDispatch } from "react-redux";
import { createError } from "../../features/component/components";
import * as xlsx from "xlsx";
export default function SelectPeople({ closeSelect = () => {} }) {
  const [contacts, setcontacts] = useState([]);
  const [selectedContacts, setselectedContacts] = useState([]);
  const [selectTemplate, setselectTemplate] = useState(false);
  const [allContacts, setallContacts] = useState(false);
  const dispatch = useDispatch();
  const formId = useSelector((state) => state.preview.previewId);
  let subject = "";
  let body = "";
  let sign = "";
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
          return {
            value: x.email,
            label: x.email,
            salutation: x.salutation,
            first: x.firstName,
            last: x.lastName,
          };
        });
        console.log([...c]);

        setcontacts([...c]);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  // this will handle sending the mail
  const handleSendMail = async () => {
    if (subject.length > 0 && body.length > 0 && sign.length > 0) {
      const maildata = {
        subject,
        body,
        sign,
        contacts,
        formId,
        link: `http://localhost:3001/collect/response/${formId}`,
      };
      console.log("this is the maildata", maildata);
      const res = await sendMail(maildata);
      if (res.status == "success" || res.status == 200) {
        console.log("succcess", res);
        dispatch(
          createError({
            text: "Mail were dispatched successfully",
            type: "success",
          })
        );
        closeSelect();
      } else {
        console.log("failure", res);
      }
    } else {
      dispatch(
        createError({
          text: "Please add subject,body & singature!",
          type: "warning",
        })
      );
    }
  };

  //get body signature and subject from the template
  const getEmailDetails = (sub, bod, signature) => {
    subject = sub;
    body = bod;
    sign = signature;
    console.log("was called", subject, body, sign);
  };

  return (
    <div className="people-modal text-gray-600 ">
      <div className="min:h-96 w-1/2 bg-gray-100 mx-auto mt-48 p-6 rounded">
        <div className="relative  w-full flex flex-row-reverse">
          <button
            className="mr-2"
            onClick={() => {
              closeSelect();
            }}
          >
            {" "}
            <XCircleIcon className="h-7 text-gray-800 hover:text-red-500" />
          </button>
        </div>
        {!selectTemplate ? (
          <>
            <h1
              className="text-4xl font-thin ml-3"
              style={{ marginTop: "-40px" }}
            >
              How it works ?
            </h1>

            <div className="flex w-full p-3">
              <span className="font-thin text-sm">
                Select the excel file that contains all the users whom you want
                to share...
                <input
                  type="file"
                  webkitdirectory
                  onChange={(e) => {
                    readUploadFile(e);
                  }}
                />
              </span>
            </div>
            <div className=" w-full p-3"></div>
            <div className="select-people p-3">
              {contacts.length > 0 ? (
                <>
                  <Select
                    isDisabled={allContacts}
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
                <div className="flex flex-row-reverse mr-6">
                  <input
                    type="checkbox"
                    name="allContacts"
                    id=""
                    onChange={() => {
                      setallContacts(!allContacts);
                      if (allContacts == true) setallContacts([...allContacts]);
                    }}
                  />
                  <label for="allContacts" className="text-gray-700 font-thin ">
                    &nbsp;Select all&nbsp;&nbsp;
                  </label>
                </div>
                <div className="flex flex-row-reverse p-3">
                  <button
                    className=" bg-blue-500 text-blue-100"
                    onClick={() => {
                      if (setallContacts.length > 0) setselectTemplate(true);
                    }}
                  >
                    {" "}
                    &nbsp; Create Template &nbsp;
                    <span style={{ transform: "rotate(90deg)" }}>
                      <PaperAirplaneIcon className="h-5" />
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Teamplate callback={getEmailDetails} />
            <button
              onClick={() => {
                handleSendMail();
              }}
              className="m-auto border-solid border border-gray-100 tranisition duration-150 ease-in hover:border-solid hover:border hover:border-gray-200"
            >
              Send Mail
            </button>
          </>
        )}
      </div>
    </div>
  );
}
