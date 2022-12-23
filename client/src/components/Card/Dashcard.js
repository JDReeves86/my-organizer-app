import React from "react";
import { capitalizeFirstLetter } from "../../utils/helpers";

function DashCard({ user }) {
  return (
    <div className="card-container">
      <div className="card-header">
        <h1 className="is-size-2 card-heaader-title p-3">
          {capitalizeFirstLetter(user.username)}
        </h1>
      </div>
    </div>
  );
}

export default DashCard;
