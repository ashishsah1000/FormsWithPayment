import React from "react";
import "./thanks.css";

export default function Thanks() {
  return (
    <div className="mx-auto">
      <div className="w-1/2   mx-auto bg-blue-800 p-6 mt-36 rounded">
        <div className=" mx-auto flex ">
          <div className="mx-auto ml-3 mt-3 text-blue-100 p-3">
            <div className="flex flex-wrap">
              <img
                src="/images/winner.svg"
                alt="Winner"
                border="0"
                height={"40px"}
                className=""
              />
              <h1 className="font-bold text-4xl my-6">Thank you!</h1>
            </div>

            <p>For contacting us, your response was registerd</p>
            <p>Feel free to close the window </p>
          </div>
        </div>

        <div className="footer-like w-full rounded p-6 bg-blue-900 text-blue-300">
          <p>Lorem Ipsum and some other text that we can add here </p>
        </div>
      </div>
    </div>
  );
}
