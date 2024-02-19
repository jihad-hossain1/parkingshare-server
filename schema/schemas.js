const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { users, user } = require("../graphql/query/user.Query");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../graphql/mutation/user.Mutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // user
    users,
    user,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // user
    createUser,
    updateUser,
    deleteUser,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
