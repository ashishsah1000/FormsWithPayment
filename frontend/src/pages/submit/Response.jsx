import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getResponse, getForm } from "../../axios/forms";
import { TextBoxView, OptionView, Rating } from "../../components";

export default function Response() {
  // get the specific id of the form
  const [data, setData] = useState([]);
  let { id } = useParams();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.preview.responses);
  const fetchData = async () => {
    var newData = await getResponse(id);
    // this will update the desired title and description of the form
    searchForm(newData.data[0].formid);

    setData([...newData.data]);
  };

  const [mainTitle, settitle] = useState("");
  const [mainDescription, setdescription] = useState("");
  const searchForm = async (id) => {
    var res = await getForm(id);
    console.log("your id", id, "My response", res);
    if (res !== "error") {
      settitle(res.data[0].title);
      setdescription(res.data[0].description);
    } else {
      console.log("unable to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-24">
      <div className=" w-11/12 lg:max-w-6xl bg-grey-100 text-gray-700 shadow-lg   preview ">
        <div className="title">
          <div className="content">
            <h1 className="text-4xl font-bold my-4">{mainTitle}</h1>
            <h3>{mainDescription}</h3>
          </div>
        </div>
        <div className="text-gray-600 user-response">
          {data.length > 0 ? (
            data[0].forms.map((x, i) => {
              if (x.type == "textbox") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>
                    <TextBoxView question={x.question} answer={x.value} />
                  </div>
                );
              }
              if (x.type == "rating") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>
                    <div className="p-3">
                      <h1 className="font-bold text-xl">{x.question}</h1>
                      <Rating viewValue={x.value} mode="response" />
                    </div>
                  </div>
                );
              }
              if (x.type == "textarea") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>
                    <div className="p-3">
                      <h1 className="font-bold text-xl">{x.question}</h1>
                      <h3 className="mx-3 mt-3 ">{x.value}</h3>
                    </div>
                  </div>
                );
              }
              if (x.type == "datepick") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>
                    <div className="p-3">
                      <h1 className="font-bold text-xl">{x.question}</h1>
                      <span className="p-6 ">{x.value}</span>
                    </div>
                  </div>
                );
              }
              if (x.type == "options") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>

                    <OptionView
                      array={x.value}
                      mode="response"
                      question={x.question}
                      answer={x.value}
                    />
                  </div>
                );
              }
              if (x.type == "radio") {
                return (
                  <div className="preview-elements  bg-gray-50 p-3">
                    <h1 className="font-bold">Question </h1>

                    <OptionView
                      array={x.value}
                      mode="response"
                      question={x.question}
                      answer={x.value}
                    />
                  </div>
                );
              }
              if (x.type == "section") {
                return (
                  <div
                    className={`  mt-6 preview-elements  sectionPreview `}
                    style={{
                      background: x.data.properties.background,
                      color: x.data.properties.color,
                    }}
                  >
                    <h1 className="text-4xl font-bold"> {x.question}</h1>
                    <h1 className="my-4 mx-3">{x.data.lable}</h1>
                  </div>
                );
              }
            })
          ) : (
            <>Data is being fetched</>
          )}
        </div>
        <div className="p-6">
          <button
            className="m-auto bg-blue-500 text-gray-100 font-bold  "
            onClick={() => {
              console.log("calling print");
            }}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
