import React from "react";

export default function TextBoxView({ question = "", answer = "", id = "" }) {
  return (
    <div className="p-3">
      <h1 className="text-xl font-bold">{question}</h1>
      <h3 className="mx-3 mt-3">{answer}</h3>
    </div>
  );
}
