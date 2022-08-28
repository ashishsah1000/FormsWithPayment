import React from "react";
import Select from "react-select";

export default function ReactOptions({ options = [{}], callback = () => {} }) {
  return (
    <div>
      <Select options={options} onChange={callback} />
    </div>
  );
}
