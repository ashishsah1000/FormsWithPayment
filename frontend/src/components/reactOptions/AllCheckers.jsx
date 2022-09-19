import React, { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import { getAllChecker } from "../../axios/users";

// multiple select of the options
export default function AllCheckers({ options = [{}], callback = () => {} }) {
  const [data, setdata] = useState([]);

  const getCheckers = async () => {
    const res = await getAllChecker();
    var objArr = res.data.map((x) => ({ value: x, label: x }));
    console.log(objArr);
    setdata([...objArr]);
  };
  useEffect(() => {
    getCheckers();
  }, []);

  return (
    <div>
      <Select
        placeholder="Select the approver"
        options={data}
        isMulti
        closeMenuOnSelect={false}
        onChange={callback}
      />
    </div>
  );
}
