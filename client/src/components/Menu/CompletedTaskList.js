import React from "react";
import Button from "../Button/Button";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../utils/mutations";
import ErrorModal from "../Modals/ErrorModal";
import { GET_MY_TASKS } from "../../utils/queries";

function CompletedTasks({ input }) {
  const [deleteThisTask, {error, loading}] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }]
  })

  if(error) {
    return <ErrorModal message={error.message} active={true}/>
  }

  const handleDelete = async (task) => {
    try {
      await deleteThisTask({
        variables: { id: task }
      })
    } catch(error) {throw new Error(error);
  }
}

  return (
    <aside className="menu pl-2 pt-4">
      <p className="menu-label has-text-white">Completed Tasks</p>
      <ul className="menu-list">
        {input.map((el) => {
          return (
            <div className="level">
              <li key={el._id} taskid={el._id} className="level-item level-left">
                <Button attr="is-small is-ghost" action={() => {handleDelete(el._id)}}>
                  <span className="icon is-small has-text-danger">
                    <i className="fas fa-trash"></i>
                  </span>
                </Button>
                {el.taskText}
              </li>
            </div>
          );
        })}
      </ul>
    </aside>
  );
}

export default CompletedTasks;
