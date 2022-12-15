import React from "react";

function NavItem({ href, children, action, attr, linked }) {
  if (attr === undefined) {
    return linked ? (
      <a href={href} onClick={action} className={`navbar-item`}>
        {children}
      </a>
    ) : (
      <div className={`navbar-item ${attr}`}>{children}</div>
    );
  }
  else {
    return linked ? (
      <a href={href} onClick={action} className={`navbar-item`}>
        {children}
      </a>
    ) : (
      <div className={`navbar-item ${attr}`}>{children}</div>
    );
  }
  
}

export default NavItem;
