import React from "react";
import NavbarItem from "./NavbarItem";

function NavbarList({ menu }) {
  return menu === undefined || menu.length <= 0 ? null : (
    <div className={`navbar-item has-dropdown is-hoverable`}>
      <a className="navbar-link">More</a>

      <div className="navbar-dropdown">
        <NavbarItem links={menu} />
      </div>
    </div>
  );
}

export default NavbarList;
