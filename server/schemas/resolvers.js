const { User, Task } = require("../models");
const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      console.log(context.user);
    },
  },
  Mutation: {
    login: async (parent, args, context) => {
      console.log(args);
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
      }
       catch(err) {
        return new Error(err)
      }
    }
  }
}

module.exports = resolvers;
