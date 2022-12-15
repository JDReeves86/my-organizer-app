import React from "react";

function Button({ attr, children, action }) {
  return attr === undefined ? (
    <button className="button" onClick={action}>{children}</button>
  ) : (
    <button onClick={action} className={`button ${attr}`}>
      {children}
    </button>
  );
}

export default Button;
