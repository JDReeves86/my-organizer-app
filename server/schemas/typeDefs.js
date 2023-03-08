const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    notes: [Note]
    activeTasks: [Task]
    completedTasks: [Task]
  }
  type Task {
    _id: ID
    taskText: String
    dueDate: String
    createdAt: String
    active: Boolean
  }

  type Note {
    _id: ID
    createdAt: String
    title: String
    noteValue: String
    }

  type Auth {
    token: ID!
    user: User
  }

  input taskData {
    taskText: String
    dueDate: String
    active: Boolean
    _id: ID
  }

  input noteData {
    noteValue: String
    title: String
    _id: ID
  }

  type Query {
    getMe: User
    getMyTasks: User
    getTask(_id: ID): Task
    getMyNotes: User
    getNote(_id: ID): Note
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createNewUser(email: String!, password: String!, username: String!): User
    saveTask(input: taskData): Task
    completeTask(_id: ID): Task
    editTask(input: taskData): Task
    deleteTask(_id: ID): Task
    saveNote(input: noteData): Note
    updateNote(input: noteData): Note
  }
`;

module.exports = typeDefs;
