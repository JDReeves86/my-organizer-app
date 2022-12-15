import React from "react";

function Button({ attr, children, action }) {
  return attr === undefined ? (
    <button classname="button" onClick={action}>{children}</button>
  ) : (
    <button onClick={action} className={`button ${attr}`}>
      {children}
    </button>
  );
}

export default Button;
