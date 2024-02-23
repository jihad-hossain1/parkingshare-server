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

const ParkingLotType = new GraphQLObjectType({
  name: "ParkingLot",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    location: { type: GraphQLID },
    categoryId: { type: GraphQLID },
    clientId: { type: GraphQLID },
    lotType: { type: GraphQLString },
    status: { type: GraphQLString },
    address: {
      type: new GraphQLObjectType({
        name: "Addresstype",
        fields: () => ({
          id: { type: GraphQLID },
          area: { type: GraphQLString },
          map: { type: GraphQLString },
        }),
      }),
    },
    price: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "PriceType",
          fields: () => ({
            id: { type: GraphQLID },
            _time: { type: GraphQLString },
            cost: { type: GraphQLInt },
          }),
        })
      ),
    },
    avilableLot: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "AvailableLot",
          fields: () => ({
            id: { type: GraphQLID },
            bay: { type: GraphQLString },
          }),
        })
      ),
    },
  }),
});

module.exports = { ParkingLotType };
