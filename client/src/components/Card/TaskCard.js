import React from "react";

function TaskCard({ taskInput }) {
  const {
    taskData: {
      data: {
        getTask: { taskText, dueDate, createdAt },
      },
    },
  } = taskInput;
  console.log(taskInput);

  return (
    <div className="card-container">
      <div className="card-header">
        <p className="card-header-title">{taskText}</p>
      </div>
      <div className="card-body">
        <div className="card-content">
            <p>{`Due: ${dueDate}`}</p>
            <p>{`Task Created: ${createdAt}`}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
