import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";
import { updateResponse } from "../../features/preview/preview";

export default function DatePick({
  mode = "",
  id = "",
  type = "",
  question = "Question goes here",
}) {
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  const handleChangeDate = (data) => {
    dispatch(
      updateResponse({
        id: id,
        type: type,
        value: data.toString(),
        question: "this will be question",
      })
    );
    console.log(response);
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input  bg-gray-100 text-gray-900 shadow-md"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  return (
    <div className="my-6">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          handleChangeDate(startDate);
        }}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
}
