import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResponse } from "../../axios/forms";

export default function Response() {
  // get the specific id of the form
  const [data, setData] = useState([]);
  let { id } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.preview.responses);
  const fetchData = async () => {
    var newData = await getResponse(id);
    console.log(
      "🚀 ~ file: response.jsx ~ line 22 ~ getforms ~ newData",
      newData
    );

    setData([...newData.data]);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className=" w-11/12 lg:max-w-6xl bg-grey-100 shadow-lg   preview ">
        <div className="title">
          <div className="content">
            <h1 className="text-4xl font-bold my-4">Title of the Form</h1>
            <h3>Some other information</h3>
          </div>
        </div>
        <div className="p-6">
          {formData.map((x, i) => {
            if (x.type == "textbox") {
              return (
                <div className="preview-elements my-6">
                  <h1 className="font-bold">Question {i + 1}</h1>
                  <h1 className="my-4 mx-3">{x.question}</h1>
                  <h3>{x.value}</h3>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
