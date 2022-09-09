import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./login.css";
// css coming from login
import { registerUser } from "../../axios/users";
import { useDispatch, useSelector } from "react-redux";
import { createError } from "../../features/component/components";
import { ReactOptions, SpinnerButton } from "../../components";
import { PaperAirplaneIcon } from "@heroicons/react/solid/";

export default function Register() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [roles, setroles] = useState("");
  const [password, setpassword] = useState("");

  //   fetchingbutton loading button switch
  const [fetchbutton, setfetchbutton] = useState(false);
  var dispatch = useDispatch();
  const navigate = useNavigate();
  const register = async () => {
    setfetchbutton(!fetchbutton);

    if (email.length < 3 || username == "" || roles == "" || password == "") {
      dispatch(
        createError({ text: "Please add the required field", type: "warning" })
      );
    }
    var res = await registerUser({
      username: username,
      password: password,
      role: roles,
      email: email,
    });
    console.log("🚀 ~ file: Login.jsx ~ line 15 ~ login ~ res", res);
    if (res.status == "success") {
      dispatch(createError({ text: res.text, type: "success" }));
      navigate("/forms");
    } else {
      console.log(fetchbutton);

      setfetchbutton(true);

      console.log(fetchbutton);

      dispatch(createError({ text: res.text, type: "warning" }));
    }
  };
  useEffect(() => {}, [fetchbutton]);

  const options = [
    { value: "checker", label: "Checker" },
    { value: "admin", label: "Admin" },
    { value: "creator", label: "Creator" },
    { value: "publisher", label: "Publisher" },
  ];
  const handleOptionChange = (selectedOption) => {
    setroles(selectedOption.value);
  };
  return (
    <div className="preview login">
      <div className="md:w-1/2 lg:w-1/2 sm:w-10/12  content mx-auto md:mt-20 mt-10 xs:mt-10 lg:mt-24 xl:mt-24 rounded shadow-lg bg-gray-100 ">
        <div className="title">
          <div className="content">
            <h1 className="text-4xl font-bold my-4">Register new users</h1>
            <p>Please add all the information and appoint diffrent roles</p>
          </div>
        </div>
        <div className="p-6">
          <div className="w-full flex flex-wrap">
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
          <div className="w-full flex flex-wrap">
            <input
              type="text"
              className="my-2 p-3 w-72 mx-3 rounded"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />
            <div className="grow">
              {/* <label for="roles">Choose a car:</label>
              <select name="role">
                <option value={"Select a role"}>Please select a role</option>
                <option value={""}>Checker</option>
                <option value={""}>Admin</option>
              </select> */}
              <div className="mt-3 w-72 ml-3">
                <ReactOptions callback={handleOptionChange} options={options} />
              </div>
            </div>
          </div>
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
        {!fetchbutton ? (
          <button
            className="bg-blue-700 text-gray-100 mx-auto my-4 "
            onClick={() => {
              register();
            }}
          >
            &nbsp; Register &nbsp;
            <span style={{ transform: "rotate(90deg)" }}>
              <PaperAirplaneIcon className="h-6" />
            </span>
          </button>
        ) : (
          <SpinnerButton classes="mx-auto my-4 bg-red-700" />
        )}

        {/* </Link> */}
        <div className="mt-4">&nbsp;</div>
      </div>
    </div>
  );
}
