const { GraphQLID, GraphQLList } = require("graphql");
const { UserType } = require("../../typeDefs/typeDefs");
const User = require("../../models/user.models");

const users = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    return User.find();
  },
};

const user = {
  type: UserType,
  args: { id: { type: GraphQLID } },
  resolve(parent, args) {
    return User.findById(args.id);
  },
};

module.exports = { users, user };
