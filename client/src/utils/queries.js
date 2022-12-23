import { gql } from "@apollo/client";

export const GET_MY_TASKS = gql`
  query getMyTasks {
    getMyTasks {
      tasks {
        _id
        taskText
        dueDate
      }
    }
  }
`;

export const GET_SINGLE_TASK = gql`
  query getTask($taskId: ID!) {
    getTask(_id: $taskId) {
      _id
      taskText
      dueDate
    }
  }
`;
