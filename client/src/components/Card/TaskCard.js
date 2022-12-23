import React from "react";
import Column from "../Columns/Column";
import { COMPLETE_TASK } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

function TaskCard({ taskInput, action }) {
  const [completeThisTask, { error, data }] = useMutation(COMPLETE_TASK)
  console.log(taskInput)
  const {
    taskData: {
      data: {
        getTask: { _id, taskText, dueDate, createdAt },
      },
    },
  } = taskInput;

  return (
    <Column columns={true}>
      <Column attr={"is-half is-offset-one-quarter mt-6"}>
        <div className="card-container mt-6 p-3">
          <div className="card-header has-background-info">
            <p className="card-header-title has-text-light">{taskText}</p>
          </div>
          <div className="card-body has-background-grey-lighter">
            <div className="card-content">
              <p className="py-3">{`Due: ${dueDate}`}</p>
              <p className="py-3">{`Task Created: ${createdAt}`}</p>
            </div>
          </div>
          <footer className="card-footer">
            <a
              className="card-footer-item has-text-success has-background-light"
              onClick={ async () => {
                const completedTask = await completeThisTask({
                  variables: { id: _id }
                })
              }}
            >
              Complete
            </a>
            <a
              className="card-footer-item has-text-link has-background-light"
              onClick={() => {
                console.log(
                  "set up card to display current task to edit. Maybe wet action state to something completely different? add another if statement in Tasks could work I suppose..."
                );
              }}
            >
              Edit
            </a>
            <a
              className="card-footer-item has-text-danger has-background-light"
              onClick={() => {
                action({ new: true });
              }}
            >
              Cancel
            </a>
          </footer>
        </div>
      </Column>
    </Column>
  );
}

export default TaskCard;
