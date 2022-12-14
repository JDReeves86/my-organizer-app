import React from "react";
import Auth from "../utils/auth";
import DashCard from "../components/Card/Dashcard";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";

function Dashboard() {
  if (!Auth.loggedIn()) document.location.replace("/");
  return (
    <>
      <Hero attr={"has-background-info-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <DashCard user={JSON.parse(localStorage.getItem("user"))} />
    </>
  );
}

export default Dashboard;
