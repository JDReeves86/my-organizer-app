import React from "react";
import Auth from "../utils/auth"
import DashCard from "../components/Card/Dashcard";

function Dashboard() {
    if (!Auth.loggedIn()) document.location.replace("/")
    return  (
        <DashCard user={JSON.parse(localStorage.getItem("user"))}/>
    )
}

export default Dashboard