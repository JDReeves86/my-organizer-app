const { User, Task } = require("../models");

const resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      console.log(context.user);
    },
  },
};

module.exports = resolvers;
