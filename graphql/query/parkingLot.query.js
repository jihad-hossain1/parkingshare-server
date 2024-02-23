const { GraphQLID, GraphQLList } = require("graphql");
const { ParkingLotType } = require("../../typeDefs/parkingLotTypeDefs");
const ParkingLot = require("../../models/parkingLot.models");

const getParkingLots = {
  type: new GraphQLList(ParkingLotType),
  resolve: async (parent, args) => {
    try {
      const parkingLots = await ParkingLot.find();
      return parkingLots;
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = { getParkingLots };
