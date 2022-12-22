import React from "react";
import Auth from "../../../utils/auth";
import NavItem from "./NavItem";

function NavMenu({ isActive, children }) {
  function logoutUser() {
    localStorage.clear();
    window.location.replace("/")
  }
  return Auth.loggedIn() ? (
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
        <NavItem action={() => {logoutUser()}} linked={true}>Logout</NavItem>
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
        <NavItem href="/login" linked={true}>Login</NavItem>
      </div>
    </div>
  );
}

export default NavMenu;
