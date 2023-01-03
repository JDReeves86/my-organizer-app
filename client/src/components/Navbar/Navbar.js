import React, { useState } from "react";
import Logo from "../giraffe-1120.png"
import NavBurger from "./Components/NavBurger";
import NavMenu from "./Components/NavMenu"
import Image from "../Image/Image";

export default function Navbar({ attr, id }) {
  // setActive is for toggling menus on/off 
  const [isActive, setActive] = useState(false);
  // Pass data into the navMenu and it will generate buttons for you with the title being displayed. Set 'linked' to true if you want
  // the navItem generated to be a clickable link. Set 'linked' to false if yoiu want it to be simple text e.g. project name.
  // When placing navbar, it takes two props: attr & id; attr will take class based css attribues e.g Bulma. While id will take whatever
  // id you wish to give it for custom css if desired. 
  // To use Navbar to it's fullest extent you will need to provide some fine tuning to your needs/wants for the project. i.e adding navitems, dropdown menus, etc.
  const exampleData = [
    {
      title: "Home",
      href: "/home",
      linked: true
    },
    {
      title: "Task Manager",
      href: "/tasks",
      linked: true
    },
    {
      title: "Notes",
      href: "/notes",
      linked: true
    },
    {
      title: "Nothing",
      linked: false
    }
  ]

  return (
    <nav
      className={`navbar ${attr}`}
      id={id}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a
          className="navbar-item"
        >
          <Image src={Logo} alt="logo" />
        </a>
        <NavBurger action={setActive} isActive={isActive} />
      </div>
      <div className="navbar-end">
        <NavMenu isActive={isActive}>
          {exampleData}
          {/* Feed an array of values and the menu will create nav menu buttons for you. */}
        </NavMenu>
      </div>
    </nav>
  );
}
