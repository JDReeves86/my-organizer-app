import React from "react";

import NavBurger from "./subcomps/NavBurger";
import NavbarItem from "./subcomps/NavbarItem";
import NavbarList from "./subcomps/NavbarList";

function DesktopNav({ isClicked, clicked, menu, links, setPage, inactive }) {
  return [
    <div className="navbar-brand">
      <NavBurger isClicked={isClicked} clicked={clicked} attr={inactive} />
    </div>,

    <div className="navbar-menu">
      <div className="navbar-start">
        <NavbarItem links={links} setPage={setPage} />
        <NavbarList menu={menu} />
      </div>
    </div>,
  ];
}

export default DesktopNav; 