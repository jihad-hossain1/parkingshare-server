const {
  GraphQLString,
  GraphQLInt,
  GraphQLScalarType,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLEnumType,
} = require("graphql");

const AddressInput = new GraphQLInputObjectType({
  name: "AddressInput",
  fields: {
    area: { type: new GraphQLNonNull(GraphQLString) },
    map: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const AvilableLotInput = new GraphQLInputObjectType({
  name: "AvilableLotInput",
  fields: {
    bay: { type: new GraphQLNonNull(GraphQLInt) },
    token: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const PriceInput = new GraphQLInputObjectType({
  name: "PriceInput",
  fields: {
    _time: { type: new GraphQLNonNull(GraphQLString) },
    cost: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const UserRoleInput = new GraphQLEnumType({
  name: "UserRoleInput",
  values: {
    user: { value: "user" },
    client: { value: "client" },
    admin: { value: "admin" },
  },
});

const LotTypeInput = new GraphQLEnumType({
  name: "LotTypeInput",
  values: {
    casual: { value: "casual" },
    longTerm: { value: "longTerm" },
  },
});

const ParkingLotApproveStatusInput = new GraphQLEnumType({
  name: "ParkingLotApproveStatusInput",
  values: {
    pending: { value: "pending" },
    approve: { value: "approve" },
    reject: { value: "reject" },
  },
});

module.exports = {
  PriceInput,
  AddressInput,
  UserRoleInput,
  ParkingLotApproveStatusInput,
  AvilableLotInput,
  LotTypeInput,
};
