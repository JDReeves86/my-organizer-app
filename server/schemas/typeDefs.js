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
    noteValue: [noteValue]
    createdAt: String
  }

  type noteValue {
    type: String
    children: [noteLines]
  }

  type noteLines {
    text: String
  }

  input NoteInput {
    noteValue: [noteValueInput]
  }

  input noteValueInput {
    type: String
    children: [noteLinesInput]
  }

  input noteLinesInput {
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
    saveNote(input: NoteInput): Note
  }
`;

module.exports = typeDefs;
