import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";

function Splash() {
  return (
    <>
      <Hero attr={"has-background-danger-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <h1>SPLASH Page</h1>
    </>
  );
}

export default Splash;
