const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
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

const parkingLot = {
  type: ParkingLotType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },

  resolve: async (parent, { id }) => {
    try {
      // check parking id given or vald id or not
      if (id == "" && !mongoose.Types.ObjectId.isValid(id)) {
        return new Error("parking id empty are not allow || id is not valid");
      }

      // find a specific
      const parkingLot = await ParkingLot.findById(id);
      if (!parkingLot) {
        return new Error("Parkinglot not found");
      }
      return parkingLot;
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = { getParkingLots, parkingLot };
