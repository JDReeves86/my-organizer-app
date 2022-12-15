import React from "react";

// Child elements of Columnsss.js. To nest multiple columns next to each other, create new Column with content as the children.
// https://bulma.io/documentation/columns/basics/

function Column({ attr, children, columns }) {
  if (columns) {
    return attr === undefined ? (
      <div className={`columns`}>{children}</div>
    ) : (
      <div className={`columns ${attr}`}>{children}</div>
    );
  } else {
    return attr === undefined ? (
      <div className={`column`}>{children}</div>
    ) : (
      <div className={`column ${attr}`}>{children}</div>
    );
  }
}

export default Column;
