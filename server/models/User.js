const { Schema, model } = require("mongoose");
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
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    statics: {
      async comparePassword(password) {
        const result = await bcrypt.compare(password, this.password);
        return result ? true : false;
      },
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

userSchema.pre("save", async function () {
  this.password = await hashPass(this.password);
});

const User = model("User", userSchema);

module.exports = User;
