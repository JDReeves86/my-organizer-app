import React from "react";

function HComponent({ type, children, attr }) {
  if (attr === undefined) {
    switch (type) {
      case "h1":
        return <h1>{children}</h1>;
      case "h2":
        return <h2>{children}</h2>;
      case "h3":
        return <h3>{children}</h3>;
      case "h4":
        return <h4>{children}</h4>;
      case "h5":
        return <h5>{children}</h5>;
      default:
        return <h6>{children}</h6>;
    }
  } else {
    switch (type) {
      case "h1":
        return <h1 className={attr}>{children}</h1>;
      case "h2":
        return <h2 className={attr}>{children}</h2>;
      case "h3":
        return <h3 className={attr}>{children}</h3>;
      case "h4":
        return <h4 className={attr}>{children}</h4>;
      case "h5":
        return <h5 className={attr}>{children}</h5>;
      default:
        return <h6 className={attr}>{children}</h6>;
    }
  }
}

export default HComponent;
