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

const { District, Upazila, Union } = require("../models/location.models");

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    image: { type: GraphQLString },
    role: { type: GraphQLString },
    favorites: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Favoritetype",
          fields: () => ({
            id: { type: GraphQLID },
            parkingLotId: { type: GraphQLID },
          }),
        })
      ),
    },
    reserve: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "ReserveType",
          fields: () => ({
            id: { type: GraphQLID },
            parkingLotId: { type: GraphQLID },
          }),
        })
      ),
    },
    carts: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "CartType",
          fields: () => ({
            id: { type: GraphQLID },
            parkingLotId: { type: GraphQLID },
            quantity: { type: GraphQLInt },
            total: { type: GraphQLInt },
          }),
        })
      ),
    },
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
    upazilas: {
      type: new GraphQLList(UpazilaType),
      resolve: async (parent, args) => {
        try {
          const upazilas = await Upazila.find({ district_zid: parent?.zid });
          return upazilas;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
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
    unions: {
      type: new GraphQLList(UnionType),
      resolve: async (parent, args) => {
        try {
          const unions = await Union.find({ upazilla_zid: parent?.zid });
          return unions;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    },
  }),
});

const UnionType = new GraphQLObjectType({
  name: "Union",
  fields: () => ({
    id: { type: GraphQLID },
    zid: { type: GraphQLString },
    upazilla_zid: { type: GraphQLString },
    bn_name: { type: GraphQLString },
    url: { type: GraphQLString },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

module.exports = {
  UserType,
  DivisionType,
  DistrictType,
  UpazilaType,
  UnionType,
};
