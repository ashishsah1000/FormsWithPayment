import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../../components/";
import { getForm } from "../../axios/forms";
export default function MainPreview({ mode = "submit" }) {
  const [fetching, setfetching] = useState(true);
  const [data, setData] = useState([]);
  let newData = [];
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  let { id } = useParams();

  console.log("use params", useParams());
  //fetch the data
  // if (typeof id != Number) {
  //   id = 7;
  // }
  const searchForm = async () => {
    console.log("searching for id", id);
    var res = await getForm(id);

    if (res !== "error") {
      console.log(res);
      settitle(res.data[0].title);
      setdescription(res.data[0].description);
      newData = res.data[0].forms;
      setData(newData);
      setfetching(false);
    } else {
      setfetching("probalbly an error");
    }
  };
  useEffect(() => {
    searchForm();
  }, []);

  return (
    <div>
      {fetching == true ? (
        <div>We are fetching the data</div>
      ) : (
        <>
          <Preview
            data={data}
            mode={mode}
            title={title}
            description={description}
          />
        </>
      )}
    </div>
  );
}
