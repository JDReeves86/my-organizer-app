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
      dueDate {
        month
        day
        year
      }
    }
  }
`