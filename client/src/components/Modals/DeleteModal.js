import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { DELETE_NOTE } from "../../utils/mutations";

import ErrorModal from "./ErrorModal";

function DeleteModal({ message, activate, note }) {
  const [isActive, setActive] = useState(activate);
  const [activeNote, setActiveNote] = useState(note);

  const [deleteNote, { error }] = useMutation(DELETE_NOTE);

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const handleClick = () => {
    setActive(!isActive);
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await deleteNote({
        variables: { _id },
      });
      handleClick();
      window.location.reload();
    } catch (err) {
      throw new Error(err);
    }
  };

  const active = isActive ? "is-active" : "";

  return (
    <div className={`modal ${active}`}>
      <div className="modal-background"></div>
      <div className="modal-content has-background-link-light p-3">
        <p className="is-size-4 has-text-centered m-5">{message}</p>
        <div className="columns is-centered">
          <div className="column is-narrow">
            <button
              className="button is-large is-danger mx-4"
              aria-label="Delete"
              onClick={() => {
                handleDelete(activeNote._id);
              }}
            >
              Yes
            </button>
          </div>
          <div className="column is-narrow">
            <button
              className="button is-large is-success mx-4"
              aria-label="close"
              onClick={() => {
                handleClick();
                window.location.reload();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
