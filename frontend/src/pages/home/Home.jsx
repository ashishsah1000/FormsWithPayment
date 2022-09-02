import React, { useEffect, useState } from "react";
import { Navbar, Chips } from "../../components";
import { Creator, Forms } from "../../composite/";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { MainPreview, Login, UserResponse, Users, Check } from "../";
import AllResponse from "../submit/AllResponse";
import Response from "../submit/Response";
import { getUser } from "../../localStorage/users";
export default function Home() {
  // // all the essentials of redux
  // const dispatch = useDispatch();

  // // function to update question in redux;
  // const question = (value) => {
  //   dispatch(addQuestion(value)); // this will dispatch the question value to redux
  // };
  const [loggedin, setloggedin] = useState(false);
  const navigate = useNavigate();
  const errors = useSelector((state) => state.component.errors);
  const previewComponents = useSelector(
    (state) => state.component.previewComponents
  );

  const preErros = errors;
  const mountError = () => {
    return (
      <Chips
        destroy={true}
        type={errors[errors.length - 1].type}
        text={errors[errors.length - 1].text}
      />
    );
  };
  const preview = previewComponents;
  var user = getUser();
  useEffect(() => {
    user = getUser();
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="home">
      <div className="home-error">
        {errors.map((x, i) => {
          if (errors.length - 1 == i) {
            return (
              <Chips
                destroy={true}
                type={errors[errors.length - 1].type}
                text={errors[errors.length - 1].text}
              />
            );
          }
        })}
      </div>
      <div>
        <Navbar />
      </div>
      <div className="my-6" style={{ marginTop: "90px" }}>
        <Routes>
          <Route path="/create" element={<Creator />} />
          <Route path="/edit/:id" element={<Creator mode="edit" />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/preview/:id" element={<MainPreview mode="publish" />} />
          <Route path="/preview" element={<MainPreview />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/all/response/:id" element={<AllResponse />} />
          <Route path="/response/:id" element={<Response />} />
          {user.role == "admin" ? (
            <>
              <Route path="/users/all" element={<Users />} />
            </>
          ) : (
            <></>
          )}
          {user.role == "checker" || user.role == "admin" ? (
            <>
              <Route path="/check/all" element={<Check />} />
              <Route
                path="/approve/preview/:id"
                element={<MainPreview mode="approve" />}
              />
            </>
          ) : (
            <></>
          )}

          <Route path="*" element={<Forms />} />
        </Routes>
        {/* <Creator /> */}
      </div>
    </div>
  );
}
