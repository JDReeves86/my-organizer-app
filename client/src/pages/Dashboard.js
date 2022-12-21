import React from "react";
import Auth from "../utils/auth"

function Dashboard() {
    if (!Auth.loggedIn()) document.location.replace("/")
    return  (
        <h1>DASHBOARD</h1>
    )
}

export default Dashboard