import React from "react";

const navItems = ["About", "Projects", "Contact"];

function NavBurger({ isClicked, clicked, attr }) {
  return (
    <a
      role="button"
      className={attr}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample"
      onClick={() => isClicked(!clicked)}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  );
}

export default NavBurger; 
