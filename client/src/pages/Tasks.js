import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import TaskForm from "../components/Forms/TaskForm";
import Column from "../components/Columns/Column";
import TaskMenu from "../components/Menu/TaskMenu";
import { GET_MY_TASKS } from "../utils/queries";
import Loader from "../components/Loader/Loader";

function Tasks() {
  if (!Auth.loggedIn()) document.location.replace("/");
  const { data, loading } = useQuery(GET_MY_TASKS);
  const [activeTask, setActiveTask] = useState({ new: true })
  
  if (loading) return <Loader />;

  return (
      <Column columns={true}>
        <Column attr={"is-3 has-background-grey-light"}>
          <TaskMenu list={data.getMyTasks.tasks} action={setActiveTask} />
        </Column>
        <Column>
        {activeTask.new && <TaskForm />}
        
        {!activeTask.new && console.log(activeTask.data)}
        </Column>
      </Column>
  );
}

export default Tasks;
