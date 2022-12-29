const { User, Task } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      console.log(context.user);
    },
    getMyTasks: async (parent, args, context) => {
      const activeUser = await User.findById(context.user._id).populate(
        "activeTasks"
      );
      return activeUser;
    },
    getTask: async (parent, { _id }, context) => {
      const activeTask = await Task.findById(_id);
      return activeTask;
    },
  },
  Mutation: {
    login: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError(
          "The email you entered did not match our records."
        );
      }

      const correctPw = await user.comparePassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      // context.res.cookie("token", token, {
      //   httpOnly: true,
      //   secure: true,
      //   maxAge: 8600,
      // });
      // console.log(context.res.cookie)
      return { token, user };
    },
    createNewUser: async (parent, { username, password, email }, context) => {
      try {
        const user = await User.create({
          username,
          password,
          email,
        });

        if (!user) {
          return new AuthenticationError("Failed to create user");
        }
        return user;
      } catch (err) {
        return new Error(err);
      }
    },
    saveTask: async (parent, { input }, context) => {
      try {
        const newTask = await Task.create({
          taskText: input.taskText,
          dueDate: input.dueDate,
        });
        await User.findByIdAndUpdate(context.user._id, {
          $addToSet: {
            activeTasks: newTask,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    completeTask: async (parent, { _id }, context) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(_id, {
          active: false,
        });
        const updatedUser = await User.findByIdAndUpdate(context.user._id, {
          $pull: { activeTasks: updatedTask._id },
          $addToSet: { completedTasks: updatedTask },
        });
      } catch (error) {
        console.log(error);
      }
    },
    editTask: async (parent, { input }, context) => {
      try {
        console.log(input);
        const updatedTask = await Task.findByIdAndUpdate(input._id, {
          taskText: input.taskText,
          dueDate: input.dueDate,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = resolvers;
