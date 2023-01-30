const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt")
const {
  passStrength,
  emailValidate,
  formatDate,
  comparePassword,
  hashPass,
} = require("./utils/helpers");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username cannot be blank"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email cannot be blank"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return emailValidate(email);
        },
        message: "Please enter a valid email address.",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      validate: {
        validator: function (password) {
          return passStrength(password);
        },
        message: "You need a stronger password.",
      },
    },
    createdAt: {
      type: Date,
      default: new Date(),
      get: (date) => {
        return formatDate(date);
      },
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
    ],
    activeTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    completedTasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    virtuals: {
      taskTotal: {
        get() {
          return this.tasks.length;
        },
      },
    },
  }
);

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
  this.password = await hashPass(this.password);
});

userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error('An account with that e-mail already exists'));
  } else {
    next();
  }
});

const User = model("User", userSchema);

module.exports = User;
