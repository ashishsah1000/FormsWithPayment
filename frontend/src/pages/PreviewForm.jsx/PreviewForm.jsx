import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../../components/";
import { getForm } from "../../axios/forms";
export default function PreviewForm({}) {
  const [data, setdata] = useState("");

  //fetch the data
  const searchForm = async () => {
    var res = await getForm(4);
    setdata(res.data.data[0]);
    console.log(res.data.data[0]);
  };
  useEffect(() => {
    searchForm();
  }, []);

  return (
    <div>
      {data == "" ? (
        <div>We are fetching the data</div>
      ) : (
        <>
          <h1>{data}</h1>
        </>
      )}
    </div>
  );
}
