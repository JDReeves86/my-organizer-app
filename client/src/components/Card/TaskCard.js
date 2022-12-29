import React from "react";
import Column from "../Columns/Column";
import ErrorModal from "../Modals/ErrorModal";
import { COMPLETE_TASK } from "../../utils/mutations";
import { GET_MY_TASKS } from "../../utils/queries";
import { useMutation } from "@apollo/client";

function TaskCard({ taskInput, action }) {
  const [completeThisTask, { error, data }] = useMutation(COMPLETE_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }],
  });

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const { taskData } = taskInput

  const {
    taskData: {
      data: {
        getTask: { _id, taskText, dueDate, createdAt },
      },
    },
  } = taskInput;

  return (
    <Column columns={true}>
      <Column attr={"is-10 is-offset-1 mt-6"}>
        <div className="card-container mt-6">
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
              onClick={async () => {
                const completedTask = await completeThisTask({
                  variables: { id: _id },
                });
                action({state: "new"})
              }}
            >
              Complete
            </a>
            <a
              className="card-footer-item has-text-link has-background-light"
              onClick={() => {
                action({ state: "edit", taskData });
              }}
            >
              Edit
            </a>
            <a
              className="card-footer-item has-text-danger has-background-light"
              onClick={() => {
                action({ state: "new" });
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
