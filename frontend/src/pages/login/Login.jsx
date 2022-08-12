import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login() {
  return (
    <div className="preview login">
      <div className="md:w-1/2 lg:w-1/2 sm:w-10/12  content mx-auto md:mt-20 mt-10 xs:mt-10 lg:mt-36 rounded shadow-lg bg-gray-100 ">
        <div className="title">
          <div className="content">
            <h1 className="text-4xl font-bold my-4">Login | Form Builder</h1>
            <h3>Please login to continue further</h3>
          </div>
        </div>
        <div className="p-6">
          <input
            type="text"
            className="my-2 p-3 w-72 mx-3 rounded"
            placeholder="Username"
          />
          <input
            type="password"
            className=" my-2 p-3 w-72 mx-3 rounded"
            placeholder="Password"
          />
        </div>
        <div className=" mx-8 text-blue-900 text-sm font-bold">
          <Link className="mx-3" to="/">
            Forget password?
          </Link>
          <Link className="mx-3" to="/">
            Register Now
          </Link>
        </div>
        <Link to="/forms">
          <button className="bg-blue-900 text-gray-100 mx-auto my-4 ">
            Login
          </button>
        </Link>
        <div className="mt-4">&nbsp;</div>
      </div>
    </div>
  );
}
