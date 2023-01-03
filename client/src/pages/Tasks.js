import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import TaskForm from "../components/Forms/TaskForm";
import Column from "../components/Columns/Column";
import TaskMenu from "../components/Menu/TaskMenu";
import { GET_MY_TASKS } from "../utils/queries";
import Loader from "../components/Loader/Loader";
import TaskCard from "../components/Card/TaskCard";
import EditTaskForm from "../components/Forms/EditTaskForm";
import CompletedTasks from "../components/Menu/CompletedTaskList";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar/Navbar";

function Tasks() {
  if (!Auth.loggedIn()) document.location.replace("/");
  const { data, loading } = useQuery(GET_MY_TASKS);
  const [activeTask, setActiveTask] = useState({ state: "new" });

  if (loading) return <Loader />;

  return (
    <>
      <Hero attr={"has-background-success-dark has-text-white"}>
        <h1 className="is-size-3 has-text-centered">
          Not your Fathers Planner
        </h1>
      </Hero>
      <Navbar attr={"has-background-grey-lighter"} />
      <Column columns={true}>
        <Column attr={"is-3 has-background-grey-light"}>
          <TaskMenu list={data.getMyTasks.activeTasks} action={setActiveTask} />
        </Column>
        <Column attr={"is-6"}>
          {activeTask.state === "new" && <TaskForm />}
          {activeTask.state === "edit" && <EditTaskForm input={activeTask} />}
          {activeTask.state === "view" && (
            <TaskCard taskInput={activeTask} action={setActiveTask} />
          )}
        </Column>
        <Column attr={"is-3 has-background-grey-light"}>
          <CompletedTasks input={data.getMyTasks.completedTasks} />
        </Column>
      </Column>
    </>
  );
}

export default Tasks;
