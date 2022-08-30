import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResponses, updateResponse } from "../../features/preview/preview";
import { LockClosedIcon, StarIcon } from "@heroicons/react/solid/";

import "./rating.css";
export default function Rating({
  id = 0,
  type = "rating",
  mode = "",
  viewValue = 1,
}) {
  const [value, setvalue] = useState(0);
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  let idx = "",
    t = "";
  const handleChangeRating = (index) => {
    dispatch(updateResponse({ id: id, type: type, value: ++index }));
  };
  const [rating, setrating] = useState([1, 1, 0, 0, 0]);
  const handleClick = (index) => {
    var copy = [...rating];
    for (var i = 0; i < rating.length; i++) {
      if (i <= index) {
        copy[i] = 1;
      } else {
        copy[i] = 0;
      }
    }
    setrating([...copy]);
  };

  useEffect(() => {
    if (mode == "response") {
      handleClick(viewValue - 1);
    }
  }, [value]);

  if (mode == "response") {
    return (
      <div className="flex my-6">
        {rating.map((x, i) => {
          if (x == 0) {
            return (
              <StarIcon
                className="h-8  text-yellow-500"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
              />
            );
          } else {
            return (
              <StarIcon
                className="h-8 text-yellow-500 "
                strokeWidth={1.5}
                stroke="currentColor"
              />
            );
          }
        })}
        <br />
        &nbsp;
      </div>
    );
  }

  // for creation and submit
  return (
    <div className="flex mt-3 mx-6">
      {rating.map((x, i) => {
        if (x == 0) {
          return (
            <StarIcon
              className="h-8 pointer text-yellow-500"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={() => {
                handleChangeRating(i);
                handleClick(i);
              }}
            />
          );
        } else {
          return (
            <StarIcon
              className="h-8 text-yellow-500 pointer"
              strokeWidth={1.5}
              stroke="currentColor"
              onClick={() => {
                handleChangeRating(i);
                handleClick(i);
              }}
            />
          );
        }
      })}
      <br />
      &nbsp;
    </div>
  );
}
