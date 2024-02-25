const {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");
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
  args: { name: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: async (parent, args) => {
    try {
      return await Division.findOne({ name: args.name });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

module.exports = { divisions, division };
