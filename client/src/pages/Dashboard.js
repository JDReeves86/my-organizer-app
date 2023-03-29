import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";
import DashCard from "../components/Card/Dashcard";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";
import Loader from "../components/Loader/Loader";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

function Dashboard() {
  if (!Auth.loggedIn()) document.location.replace("/");

  let { data, loading, error } = useQuery(GET_ME);

  if (loading) return <Loader />;

  return (
    <>
      <Hero attr={"has-background-info-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <DashCard user={data.getMe} />
    </>
  );
}

export default Dashboard;
