import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import splashImg from "../images/planner690x639.jpg"

function Splash() {
  return (
    <>
      <Hero attr={"has-background-danger-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <figure className="image">
        <img src={splashImg}></img>
      </figure>
    </>
  );
}

export default Splash;
