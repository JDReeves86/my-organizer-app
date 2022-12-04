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
  type Query {
    getMe: User
  }
`;

module.exports = typeDefs;
