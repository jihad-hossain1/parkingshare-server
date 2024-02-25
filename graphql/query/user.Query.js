const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
const { UserType } = require("../../typeDefs/typeDefs");
const User = require("../../models/user.models");

const users = {
  type: new GraphQLList(UserType),
  resolve: async (parent, args) => {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error);
    }
  },
};

const user = {
  type: UserType,
  args: { email: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: async (parent, { email }) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return new Error("User are not found");
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { users, user };
