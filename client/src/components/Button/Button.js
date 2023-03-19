import React from "react";

function Button({ attr, children, action, type }) {
  return attr === undefined ? (
    <button className="button" onClick={action} type={type}>{children}</button>
  ) : (
    <button onClick={action} className={`button ${attr}`} type={type}>
      {children}
    </button>
  );
}

export default Button;
