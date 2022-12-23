import React, { createContext, useContext } from "react";
import { useTaskReducer } from "../reducers/taskReducer";

const TaskContext = createContext();

const TaskProvider = ({ value = [], children, ...props }) => {
  const [TaskState, dispatch] = useTaskReducer({});

  return (
    <TaskContext.Provider value={[TaskState, dispatch]} {...props}>
      {children}
    </TaskContext.Provider>
  );
};

const useTaskContext = () => useContext(TaskContext);

export { TaskProvider, useTaskContext };