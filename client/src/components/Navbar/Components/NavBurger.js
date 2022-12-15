import React from "react";

function NavBurger({ isActive, action }) {
  return (
    <>
      <a
        onClick={() => {action(!isActive)}}
        role="button"
        className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </>
  );
}

export default NavBurger;
