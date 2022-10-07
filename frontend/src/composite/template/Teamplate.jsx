import React, { useState } from "react";
import { XCircleIcon, PaperAirplaneIcon, Smile } from "@heroicons/react/solid/";
import "./template.css";
import { useSelector, useDispatch } from "react-redux";
import { createError } from "../../features/component/components";
export default function Teamplate({
  callback = () => {},
  closeTemplate = () => {},
}) {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sign, setSign] = useState("");
  const [declare, setdeclare] = useState(false);
  // get all the information about the form
  const formId = useSelector((state) => state.preview.previewId);
  console.log("consoling the form Id", formId);
  const handleDeclaration = (e) => {
    setdeclare(e.target.checked);
    if (true == e.target.checked) {
      if (subject.length > 0 && sign.length > 0 && body.length > 0) {
        callback(subject, body, sign);
      } else {
        setdeclare(false);
        dispatch(
          createError({
            text: "Please add subject,body & singature!",
            type: "warning",
          })
        );
      }
    } else {
      setdeclare(e.target.checked);
    }
  };
  return (
    <div
      className="template"
      style={{
        padding: "10px 40px",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          maxHeight: "300px",
          overflowY: "scroll",
          border: "1px solid rgba(22,22,22,.3)",
        }}
      >
        <div
          style={{
            background: "rgba(21,21,140,1)",
            color: "rgba(222,222,222,.9)",
            display: "flex",
            padding: "20px 20px",
            marginBottom: "40px",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Survey Form | By D&B
        </div>
        <div style={{ padding: "20px 20px" }}>
          <input
            type="text"
            placeholder="Please add subject"
            style={{
              padding: "10px 20px",
              width: "300px",
              marginLeft: "20%",
              border: "1px solid rgba(222,22,22,.1)",
            }}
            onChange={(e) => {
              setSubject(e.target.value);
              setdeclare(false);
            }}
          />
        </div>
        <div style={{ padding: "20px 20px" }}>
          <h1 className="font-bold">
            From :{" "}
            <span
              style={{
                fontWeight: "800",
                background: "rgba(222,122,22,1)",
                color: "white",
                fontSize: "12px",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
            >
              khannapo@dnb.com{" "}
            </span>
          </h1>
          <h1 style={{ marginTop: "20px" }}>
            <span style={{ fontWeight: "200" }}>
              Dear Sir / Madam Last First Name,{" "}
            </span>
          </h1>
          <div style={{ display: "flex", fontWeight: "200" }}>
            <textarea
              style={{
                margin: "0px auto",
                background: "rgba(222, 22, 22, 0.0)",
                padding: "20px 40px",
                fontWeight: "200",
              }}
              onChange={(e) => {
                setBody(e.target.value);
                setdeclare(false);
              }}
              cols={70}
              rows={3}
              placeholder="Enter any other infomation if you want to add"
            ></textarea>
          </div>
          <div>
            <p>
              Please find the survey link{" "}
              <a
                target={"_blank"}
                href={`/collect/response/${formId}`}
                style={{ color: "rgba(22,22,222,1)" }}
              >
                Link of the survey
              </a>
            </p>
          </div>
        </div>
        <div style={{ padding: "20px 20px" }}>
          <textarea
            cls={10}
            type="text"
            placeholder="Signature"
            cols={40}
            rows={5}
            style={{
              padding: "10px 20px",
              border: "1px solid rgba(222,22,22,.1)",
            }}
            onChange={(e) => {
              setSign(e.target.value);
              setdeclare(false);
            }}
          />
          <br />
          <br />

          <div>
            <input
              type="checkbox"
              name="accept"
              checked={declare}
              onClick={(e) => {
                handleDeclaration(e);
              }}
            />
            <label for="accept">
              &nbsp; I hearby accept the form builder aggrement.
            </label>
          </div>
        </div>
        <div
          style={{
            background: "rgba(21,21,140,1)",
            color: "rgba(222,222,222,.9)",
            display: "flex",
            padding: "20px 20px",
            marginTop: "40px",
          }}
        >
          <div style={{ flex: 1 }}>Company Name and Logo</div>
          <div>Some other links</div>
        </div>
      </div>
    </div>
  );
}
