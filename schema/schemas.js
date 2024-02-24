const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { users, user } = require("../graphql/query/user.Query");
const { divisions, division } = require("../graphql/query/location.query");
const {
  getParkingLots,
  parkingLot,
} = require("../graphql/query/parkingLot.query");

// mutation importer
const { createParkingLot } = require("../graphql/mutation/parkingLot.mutation");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../graphql/mutation/user.Mutation");
const { updateDivision } = require("../graphql/mutation/location.mutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // user
    users,
    user,
    // locations
    divisions,
    division,

    // pakinglots
    getParkingLots,
    parkingLot,
  },
});

const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // user
    createUser,
    updateUser,
    deleteUser,
    // location
    updateDivision,
    // parkinglot
    createParkingLot,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
