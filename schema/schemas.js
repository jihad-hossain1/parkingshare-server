const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { users, user } = require("../graphql/query/user.Query");
const {
  divisions,
  division,
  getDistrictByDivisionId,
} = require("../graphql/query/location.query");
const {
  getParkingLots,
  parkingLot,
  getParkingLotCategories,
} = require("../graphql/query/parkingLot.query");

// mutation importer
const {
  createParkingLot,
  applyForParkingLot,
  createParkingLotCategory,
} = require("../graphql/mutation/parkingLot.mutation");
const {
  createUser,
  updateUser,
  deleteUser,
} = require("../graphql/mutation/user.Mutation");
const {
  updateDivision,
  updateDistrict,
  updateUpazila,
  updateUnion,
} = require("../graphql/mutation/location.mutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // user
    users,
    user,
    // locations
    divisions,
    division,
    getDistrictByDivisionId,

    // pakinglots
    getParkingLots,
    parkingLot,
    getParkingLotCategories,
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
    updateDistrict,
    updateUpazila,
    updateUnion,
    // parkinglot
    createParkingLot,
    applyForParkingLot,
    createParkingLotCategory,
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
