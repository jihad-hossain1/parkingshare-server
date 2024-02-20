const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require("graphql");
const { District } = require("../models/location.models");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    photo: { type: GraphQLString },
  }),
});

const DivisionType = new GraphQLObjectType({
  name: "Division",
  fields: () => ({
    id: { type: GraphQLID },
    zid: { type: GraphQLString },
    bn_name: { type: GraphQLString },
    url: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
    districts: {
      type: new GraphQLList(DistrictType),
      resolve: async (parent, args) => {
        try {
          const findDistricts = await District.find({
            division_zid: parent.zid,
          });
          return findDistricts;
        } catch (error) {
          throw new Error(error);
        }
      },
    },
  }),
});

const DistrictType = new GraphQLObjectType({
  name: "District",
  fields: () => ({
    id: { type: GraphQLID },
    zid: { type: GraphQLString },
    division_zid: { type: GraphQLString },
    bn_name: { type: GraphQLString },
    lot: { type: GraphQLString },
    lon: { type: GraphQLString },
    url: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const UpazilaType = new GraphQLObjectType({
  name: "Upazila",
  fields: () => ({
    id: { type: GraphQLID },
    zid: { type: GraphQLString },
    district_zid: { type: GraphQLString },
    bn_name: { type: GraphQLString },
    url: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

module.exports = { UserType, DivisionType, DistrictType, UpazilaType };
