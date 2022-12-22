import React from "react";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <aside className="menu pl-2  pt-4">
      <p className="menu-label has-text-white">Your tasks</p>
      <ul className="menu-list">
        <li>
          <Link>
            Task title here
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Menu;
