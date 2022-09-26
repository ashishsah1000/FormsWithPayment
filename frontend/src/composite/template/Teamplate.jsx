import React from "react";
import { XCircleIcon, PaperAirplaneIcon, Smile } from "@heroicons/react/solid/";
import "./template.css";
import { useSelector } from "react-redux";

export default function Teamplate({ closeTemplate = () => {} }) {
  // get all the information about the form
  const formId = useSelector((state) => state.preview.previewId);
  console.log("consoling the form Id", formId);
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
              someone@gcompany.com
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
              cols={70}
              rows={3}
              placeholder="Enter any other infomation if you want to add"
            ></textarea>
          </div>
          <div>
            <a
              href={`/collect/response/:${formId}`}
              style={{ color: "rgba(22,22,222,1)" }}
            >
              Click here to response the form (Form Reesponse collecting url)
            </a>
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
