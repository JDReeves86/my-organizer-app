import React from "react";
import Auth from "../../../utils/auth";
import NavItem from "./NavItem";

function NavMenu({ isActive, children }) {
  return Auth.loggedIn() ? (
    <div
      id="navbarBasicExample"
      className={`navbar-menu ${isActive ? "is-active" : ""}`}
    >
      <div className="navbar-end">
        {children.map((el, i) => {
          return (
            <NavItem href={el.href} key={i}>
              {el.title}
            </NavItem>
          );
        })}
        <NavItem  /*action={logoutUser}*/  >Logout</NavItem>
      </div>
    </div>
  ) : (
    <div
      id="navbarBasicExample"
      className={`navbar-menu ${isActive ? "is-active" : ""}`}
    >
      <div className="navbar-end">
        {children.map((el, i) => {
          return (
            <NavItem href={el.href} key={i} linked={el.linked}>
              {el.title}
            </NavItem>
          );
        })}
      </div>
    </div>
  );
}

export default NavMenu;
