import React, { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

// https://bulma.io/documentation/components/navbar/

// Takes values of navbar items to display
const navItems = ["Task Tracker", "Daily Planner", "Note Keeper"];
// Takes values to be placed into navbar dropdown. May leave array empty. 
// Or remove "menu={menuitems}" entirely. Either approach will result in the dropdown not being rendered.
const menuItems = []

function Navbar() {
  const [clicked, isClicked] = useState(false);
  return (
    <nav
      className="navbar has-background-light"
      role="navigation"
      aria-label="main navigation"
    >
      {clicked ? (
        <MobileNav
          isClicked={isClicked}
          clicked={clicked}
          links={navItems}
          // menu={menuItems}
          // setPage={setPage}
          active='navbar-burger is-active'
        />
      ) : (
        <DesktopNav
          isClicked={isClicked}
          clicked={clicked}
          links={navItems}
          // menu={menuItems}
          // setPage={setPage}
          inactive="navbar-burger"
        />
      )}
    </nav>
  );
}

export default Navbar; 
