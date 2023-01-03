import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";

function Notes() {
  return (
    <>
      <Hero attr={"has-background-info-light has-text-info"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
    </>
  );
}

export default Notes
