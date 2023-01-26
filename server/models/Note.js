const { Schema, model } = require("mongoose");
const { formatDate } = require("./utils/helpers");

const noteSchema = new Schema(
  {
    noteValue: {
      type: Array,
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

const Note = model("Note", noteSchema);

module.exports = Note;
