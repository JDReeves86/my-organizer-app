const { User, Task } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      console.log(context.user);
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
  },
};

module.exports = resolvers;
