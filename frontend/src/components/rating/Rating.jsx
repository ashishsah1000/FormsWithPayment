import React from "react";
import "./rating.css";
export default function Rating() {
  return (
    <div className="flex my-6">
      <ul class="rate-area">
        <input type="radio" id="5-star" name="rating" value="5" />
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
