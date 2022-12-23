import React from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import TaskForm from "../components/Forms/TaskForm";
import Column from "../components/Columns/Column";
import TaskMenu from "../components/Menu/TaskMenu";
import { GET_MY_TASKS } from "../utils/queries";
import Loader from "../components/Loader/Loader";

function Tasks() {
  const { data, loading } = useQuery(GET_MY_TASKS);
  if (!Auth.loggedIn()) document.location.replace("/");

  if (loading) return <Loader />

  return (
    <Column columns={true}>
      <Column attr={"is-3 has-background-grey-light"}>
        <TaskMenu data={data.getMyTasks.tasks} />
      </Column>
      <Column>
        <TaskForm />
      </Column>
    </Column>
  );
}

export default Tasks;
