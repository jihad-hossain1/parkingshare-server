const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { DivisionType } = require("../../typeDefs/typeDefs");
const { Division } = require("../../models/location.models");

const divisions = {
  type: new GraphQLList(DivisionType),
  resolve: async (parent, args) => {
    try {
      return await Division.find();
    } catch (error) {
      throw new Error(error);
    }
  },
};

const division = {
  type: DivisionType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (parent, args) => {
    try {
      return await Division.findById(args.id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { divisions, division };
