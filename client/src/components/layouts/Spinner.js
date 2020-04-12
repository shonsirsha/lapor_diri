import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <div>
      <img src={spinner} style={{ width: "180px", height: "180px", display: "block", margin: "auto" }} />
    </div>
  );
};

export default Spinner;