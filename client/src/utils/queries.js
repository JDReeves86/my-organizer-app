import { gql } from "@apollo/client";

export const GET_MY_TASKS = gql`
  query getMyTasks {
    getMyTasks {
      activeTasks {
        _id
        taskText
        dueDate
        active
      }
      completedTasks {
        _id
        taskText
        dueDate
        active
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
      createdAt
      active
    }
  }
`;
