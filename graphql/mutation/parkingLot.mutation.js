const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { ParkingLotType } = require("../../typeDefs/parkingLotTypeDefs");
const {
  AddressInput,
  PriceInput,
  ParkingLotApproveStatusInput,
  AvilableLotInput,
  LotTypeInput,
} = require("../../typeDefs/AllInputType");
const ParkingLot = require("../../models/parkingLot.models");
const { default: mongoose } = require("mongoose");
const validateJSON = require("../../utils/validateJson");

const createParkingLot = {
  type: ParkingLotType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: new GraphQLNonNull(GraphQLID) },
    categoryId: { type: new GraphQLNonNull(GraphQLID) },
    clientId: { type: new GraphQLNonNull(GraphQLID) },
    lotType: { type: new GraphQLNonNull(LotTypeInput) },
    address: {
      type: new GraphQLNonNull(AddressInput),
    },
    price: {
      type: new GraphQLNonNull(new GraphQLList(PriceInput)),
    },
    avilableLot: {
      type: new GraphQLNonNull(new GraphQLList(AvilableLotInput)),
    },
  },
  resolve: async (parent, args) => {
    const {
      name,
      image,
      location,
      categoryId,
      clientId,
      address,
      price,
      avilableLot,
    } = args;
    try {
      if (name === "") {
        return new Error("name field are empty are not allow");
      } else if (image === "") {
        return new Error("image field are empty are not allow");
      } else if (categoryId === "") {
        return new Error("categoryId field are empty are not allow");
      } else if (location === "") {
        return new Error("location field are empty are not allow");
      } else if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return new Error("categoryId is not valid");
      } else if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return new Error("user id is not valid object id");
      } else if (!mongoose.Types.ObjectId.isValid(location)) {
        return new Error("location id is not valid object id");
      } else if (price.length === 0) {
        return new Error("price field are empty are not allow");
      } else if (avilableLot.length === 0) {
        return new Error("avilableLot field are empty are not allow");
      }

      const newParkingLot = new ParkingLot({
        name,
        image,
        location,
        categoryId,
        clientId,
        address,
        price,
        avilableLot,
      });
      const saveParkingLot = await newParkingLot.save();

      return saveParkingLot;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = { createParkingLot };
