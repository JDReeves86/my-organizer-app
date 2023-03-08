import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createNewUser($username: String!, $email: String!, $password: String!) {
    createNewUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const SAVE_TASK = gql`
  mutation saveTask($input: taskData!) {
    saveTask(input: $input) {
      taskText
      dueDate
      active
    }
  }
`

export const COMPLETE_TASK = gql`
  mutation completeTask($id: ID) {
    completeTask(_id: $id) {
      active
    }
  }
`

export const EDIT_TASK = gql`
  mutation editTask($input: taskData!) {
    editTask(input: $input) {
      taskText
      dueDate
      active
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(_id: $id) {
      _id
    }
  }
`

export const SAVE_NOTE = gql`
  mutation saveNote($input: noteData) {
    saveNote(input: $input) {
      noteValue
      title
    }
  }
`

export const UPDATE_NOTE = gql`
  mutation updateNote($input: noteData) {
    updateNote(input: $input) {
      noteValue
      title
      _id
    }
  }
`