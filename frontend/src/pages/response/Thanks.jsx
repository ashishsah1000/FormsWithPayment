import React from "react";
import "./thanks.css";

export default function Thanks() {
  return (
    <div className="mx-auto">
      <div className="w-1/2 mx-auto bg-blue-800 p-6 mt-36 rounded">
        <div className="wrapper-2 mx-auto flex ">
          <img
            src="https://i.ibb.co/Lkn7rkG/thank-you-envelope.png"
            alt="thank-you-envelope"
            border="0"
            className="mx-auto"
          />
          <div className="mx-auto ml-3 mt-10 text-gray-100 p-3">
            <h1 className="font-bold text-4xl my-6">Thank you!</h1>
            <p>for contacting us, your response was registerd</p>
            <p>Feel free to close the window </p>
          </div>
        </div>

        <div className="footer-like">
          <p></p>
        </div>
      </div>
    </div>
  );
}
