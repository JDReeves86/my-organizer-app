import React from "react";

function PComponent({ attr, children }) {
  return typeof attr == "undefined" ? (
    <p>{children}</p>
  ) : (
    <p className={attr}>
      {children}
    </p>
  );
}

export default PComponent;
