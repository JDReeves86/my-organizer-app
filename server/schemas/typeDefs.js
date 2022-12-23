const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    tasks: [Task]
  }
  type Task {
    _id: ID
    taskText: String
    dueDate: [dueDate]
  }

  type Auth {
    token: ID!
    user: User
  }

  type dueDate {
    month: String
    day: Int
    year: Int
  }

  input dateInput {
    month: String
    day: Int
    year: Int
  }

  input taskData {
    taskText: String
    dueDate: dateInput
  }

  type Query {
    getMe: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createNewUser(email: String!, password: String!, username: String!): User
    saveTask(input: taskData): Task
  }
`;

module.exports = typeDefs;
