const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    activeTasks: [Task]
  }
  type Task {
    _id: ID
    taskText: String
    dueDate: String
    createdAt: String
    active: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  input taskData {
    taskText: String
    dueDate: String
    active: Boolean
  }

  type Query {
    getMe: User
    getMyTasks: User
    getTask(_id: ID): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createNewUser(email: String!, password: String!, username: String!): User
    saveTask(input: taskData): Task
  }
`;

module.exports = typeDefs;
