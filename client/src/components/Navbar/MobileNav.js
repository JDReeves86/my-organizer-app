import React from "react";
import NavBurger from "./subcomps/NavBurger";
import NavbarItem from "./subcomps/NavbarItem";
import NavbarList from "./subcomps/NavbarList";

function MobileNav({ isClicked, clicked, menu, links, setPage, active }) {
  return [
    <div className="navbar-brand">
      <NavBurger isClicked={isClicked} clicked={clicked} attr={active} />
    </div>,

    <div className="navbar-menu is-active">
      <div className="navbar-start">
        <NavbarItem links={links} setPage={setPage} />
        <NavbarList menu={menu} />
      </div>
    </div>,
  ];
}

export default MobileNav;
