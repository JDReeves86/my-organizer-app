import React from "react";

function NavbarItem({ links, setPage }) {

  return links.map((el, i) => {
    switch (el) {
      case "GitHub":
        return (
          <a
            key={i}
            className="navbar-item"
            href={`https://github.com/JDReeves86`}
            target="none"
          >
            {el}
          </a>
        );
      case "LinkedIn":
        return (
          <a
            key={i}
            className="navbar-item"
            href={`https://www.linkedin.com/in/jacob-reeves-4237a9238/`}
            target="none"
          >
            {el}
          </a>
        );
      default: {
        return (
          <a
            key={i}
            className="navbar-item"
            onClick={() => {
              setPage(el);
            }}
          >
            {el}
          </a>
        );
      }
    }
  });
}

export default NavbarItem; 
