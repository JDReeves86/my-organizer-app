import React from "react";

function CompletedTasks({ input }) {
  console.log(input);
  return (
    <aside className="menu pl-2 pt-4">
      <p className="menu-label has-text-white">Completed Tasks</p>
      <ul className="menu-list">
        {input.map((el, i) => {
          return (
            <li key={el._id} taskid={i} className="py-1">
              {el.taskText}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CompletedTasks;
