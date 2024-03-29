import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { userLogin } from "../../axios/users";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../features/component/components";
import { PaperAirplaneIcon } from "@heroicons/react/solid/";
import { setUser } from "../../localStorage/users";

export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  var dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async () => {
    var res = await userLogin(username, password);
    console.log("🚀 ~ file: Login.jsx ~ line 15 ~ login ~ res", res);
    if (res.status == "success") {
      dispatch(createError({ text: res.text, type: "success" }));
      setUser(res.user);
      navigate("/forms");
    }
    if (res.status == "failure")
      dispatch(createError({ text: res.text, type: "warning" }));
  };
  useEffect(() => {
    login();
  }, []);

  return (
    <div className="preview login">
      <div className="md:w-1/2 lg:w-1/2 sm:w-10/12  content mx-auto md:mt-20 mt-10 xs:mt-10 lg:mt-24 xl:mt-36 rounded shadow-lg bg-gray-100 ">
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
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="password"
            className=" my-2 p-3 w-72 mx-3 rounded"
            placeholder="Password"
            onChange={(e) => setpassword(e.target.value)}
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
        {/* <Link to="/forms"> */}
        <button
          className="bg-blue-900 text-gray-100 mx-auto my-4 "
          onClick={() => {
            login();
          }}
        >
          &nbsp; Login &nbsp;
          <span style={{ transform: "rotate(90deg)" }}>
            <PaperAirplaneIcon className="h-6" />
          </span>
        </button>
        {/* </Link> */}
        <div className="mt-4">&nbsp;</div>
      </div>
    </div>
  );
}
