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

export const GET_MY_NOTES = gql`
  query getMyNotes {
    getMyNotes {
      notes {
        _id
        createdAt
        title
      }
    }
  }
`;

export const GET_SINGLE_NOTE = gql`
  query getNote($noteId: ID!) {
    getNote(_id: $noteId) {
      _id
      createdAt
      noteValue
      title
    }
  }
`;
