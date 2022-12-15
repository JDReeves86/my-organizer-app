import React from "react";

function Control({ attr, children }) {
  return attr === undefined ? (
    <div className="control">{children}</div>
  ) : (
    <div className={`control ${attr}`}>{children}</div>
  );
}

export default Control;
