const { Schema, model } = require("mongoose");
const { formatDate } = require("./utils/helpers");

const taskSchema = new Schema(
  {
    taskText: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
      get: (date) => {
        return formatDate(date);
      }
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (date) => {
        return formatDate(date);
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Task = model("Task", taskSchema);

module.exports = Task;
