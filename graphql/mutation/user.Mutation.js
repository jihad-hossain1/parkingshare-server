const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { UserType } = require("../../typeDefs/typeDefs");
const User = require("../../models/user.models");

const createUser = {
  type: UserType,
  args: {
    fullname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    const user = new User({
      fullname: args.name,
      email: args.email,
      password: args.password,
    });
    return await user.save();
    // Client.create();
  },
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    photo: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    return await User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          phone: args.phone,
          password: args.password,
          photo: args.photo,
        },
      },
      { new: true }
    );
  },
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    return await User.findByIdAndDelete(args.id);
  },
};

module.exports = { createUser, updateUser, deleteUser };
