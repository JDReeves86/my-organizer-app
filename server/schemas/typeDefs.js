const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
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
    noteValue: [NoteValue]
    createdAt: String
  }

  type NoteValue {
    type: String
    children: [NoteLines]
  }

  input NoteContent {
    type: String
    children: [NoteChildren]
  }

  type NoteLines {
    text: String
  }

  input NoteChildren {
    text: String
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

  type Query {
    getMe: User
    getMyTasks: User
    getTask(_id: ID): Task
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createNewUser(email: String!, password: String!, username: String!): User
    saveTask(input: taskData): Task
    completeTask(_id: ID): Task
    editTask(input: taskData): Task
    deleteTask(_id: ID): Task
    saveNote(input: NoteContent): Note
  }
`;

module.exports = typeDefs;
