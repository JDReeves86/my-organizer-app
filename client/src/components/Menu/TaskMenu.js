import React, { useState } from "react";

function TaskMenu({ data }) {
  const storedTaskIDs = data.map((el) => {
    return el._id
  })
  const handleClick = (ev) => {
    console.log(storedTaskIDs[ev.target.attributes.taskid.value])

  }
  return (
    <aside className="menu pl-2  pt-4">
      <p className="menu-label has-text-white">Your tasks</p>
      <ul className="menu-list">
        <li>
          {data.map((el, i) => {
            return <a key={el._id} taskid={i} onClick={handleClick}>{el.taskText}</a>;
          })}
        </li>
      </ul>
    </aside>
  );
}

export default TaskMenu;
