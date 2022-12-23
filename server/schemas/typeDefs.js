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
    dueDate: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input taskData {
    taskText: String
    dueDate: String
  }

  type Query {
    getMe: User
    getMyTasks: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createNewUser(email: String!, password: String!, username: String!): User
    saveTask(input: taskData): Task
  }
`;

module.exports = typeDefs;
