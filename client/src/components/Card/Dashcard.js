import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";

function DashCard({ user }) {
  return (
    <div className="card-container">
      <div className="card-header">
        <h1 className="is-size-2 card-header-title p-3">
          Welcome, {capitalizeFirstLetter(user.username)}!
        </h1>
       
      </div>
      <div className="card-content">
      <ul>
          <li>Notes taken: {user.notes.length}</li>
          <li>Tasks to be completed: {user.activeTasks.length}</li>
          <li>Completed Tasks: {user.completedTasks.length}</li>
        </ul>
      </div>
    </div>
  );
}

export default DashCard;
