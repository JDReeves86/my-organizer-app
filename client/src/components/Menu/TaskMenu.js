import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_SINGLE_TASK } from "../../utils/queries";
import ErrorModal from "../Modals/ErrorModal";

function TaskMenu({ list, action }) {
  const [getTask, { data, loading, error }] = useLazyQuery(GET_SINGLE_TASK);

  if (error) return <ErrorModal message={error.message} activate={true} />;

  const storedTaskIDs = list.map((el) => {
    return el._id;
  });

  const handleClick = async (event) => {
    const clicked = event.target.attributes.taskid.value;
    await getTask({
      variables: { taskId: storedTaskIDs[clicked] },
    });
    if (loading) return
    const activeTask = {
      new: false,
      data,
    };
    action(activeTask);
  };

  return (
    <aside className="menu pl-2 pt-4">
      <p className="menu-label has-text-white">Your tasks</p>
      <ul className="menu-list">
        <li>
          {list.map((el, i) => {
            return (
              <a key={el._id} taskid={i} onClick={handleClick}>
                {el.taskText}
              </a>
            );
          })}
        </li>
      </ul>
    </aside>
  );
}

export default TaskMenu;
