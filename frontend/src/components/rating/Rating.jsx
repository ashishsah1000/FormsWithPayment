import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResponses, updateResponse } from "../../features/preview/preview";

import "./rating.css";
export default function Rating({ id = "", type = "", mode = "" }) {
  const [value, setvalue] = useState(0);
  const dispatch = useDispatch();
  const response = useSelector((state) => state.preview.responses);
  let idx = "",
    t = "";
  const handleChangeRating = (data) => {
    // setvalue(data);
    // dispatch(updateResponse({ id: id, type: type, value: value }));
    idx = id;
    t = type;
    // console.log({ id: id, type: type, value: value });
  };

  useEffect(() => {
    handleChangeRating();
  }, [value]);

  return (
    <div className="flex my-6">
      <ul class="rate-area">
        <input
          type="radio"
          id="5-star"
          name="rating"
          value="5"
          onClick={(e) => {
            // dispatch(
            //   updateResponse({ id: idx, type: t, value: e.target.value })
            // );

            setvalue(e.target.value);
          }}
        />
        <label for="5-star" title="Amazing">
          5 stars
        </label>
        <input type="radio" id="4-star" name="rating" value="4" />
        <label for="4-star" title="Good">
          4 stars
        </label>
        <input type="radio" id="3-star" name="rating" value="3" />
        <label for="3-star" title="Average">
          3 stars
        </label>
        <input type="radio" id="2-star" name="rating" value="2" />
        <label for="2-star" title="Not Good">
          2 stars
        </label>
        <input type="radio" id="1-star" name="rating" value="1" />
        <label for="1-star" title="Bad">
          1 star
        </label>
      </ul>
      <br />
      &nbsp;
    </div>
  );
}
