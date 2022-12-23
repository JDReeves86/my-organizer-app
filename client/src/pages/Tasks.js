import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import TaskForm from "../components/Forms/TaskForm";
import Column from "../components/Columns/Column";
import TaskMenu from "../components/Menu/TaskMenu";
import { GET_MY_TASKS } from "../utils/queries";
import Loader from "../components/Loader/Loader";
import TaskCard from "../components/Card/TaskCard";

function Tasks() {
  if (!Auth.loggedIn()) document.location.replace("/");
  const { data, loading } = useQuery(GET_MY_TASKS);
  const [activeTask, setActiveTask] = useState({ new: true })
  
  if (loading) return <Loader />;

  return (
      <Column columns={true}>
        <Column attr={"is-3 has-background-grey-light"}>
          <TaskMenu list={data.getMyTasks.activeTasks} action={setActiveTask} />
        </Column>
        <Column>
        {activeTask.new && <TaskForm />}
        
        {!activeTask.new && <TaskCard taskInput={activeTask} />}
        {/*  */}
        </Column>
      </Column>
  );
}

export default Tasks;
