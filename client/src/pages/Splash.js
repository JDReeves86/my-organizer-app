import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import splashImg from "../images/paper.jpg"

function Splash() {
  return (
    <>
      <Hero attr={"has-background-danger-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <div className="box" id="splashPage">
        <div className="columns is-centered is-flex is-vcentered" id="splashCol">
          <div className="column is-half has-text-centered has-text-grey-dark">
            <p id="splashText">Welcome to your planner</p>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Splash;
