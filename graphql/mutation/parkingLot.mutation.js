const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const {
  ParkingLotType,
  ParkingLotCategoryType,
} = require("../../typeDefs/parkingLotTypeDefs");
const {
  AddressInput,
  PriceInput,
  AvilableLotInput,
  LotTypeInput,
} = require("../../typeDefs/AllInputType");
const ParkingLot = require("../../models/parkingLot.models");
const { default: mongoose } = require("mongoose");
const { UserType } = require("../../typeDefs/typeDefs");
const User = require("../../models/user.models");
const Category = require("../../models/category.models");

const createParkingLotCategory = {
  type: ParkingLotCategoryType,
  args: { name: { type: new GraphQLNonNull(GraphQLString) } },
  resolve: async (parent, { name }) => {
    try {
      if (name === "") {
        return new Error("name filed are not allow empty");
      }
      const trimed = name.trim();

      const findCategory = await Category.findOne({ name: trimed });

      if (findCategory) {
        return new Error("category are alredy exist");
      }

      const newCategroy = new Category({ name: name });

      const saveCategory = await newCategroy.save();

      return saveCategory;
    } catch (error) {
      throw new Error(error);
    }
  },
};

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
      lotType,
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
        lotType,
        avilableLot,
      });
      const saveParkingLot = await newParkingLot.save();

      return saveParkingLot;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const applyForParkingLot = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { email }) => {
    try {
      if (email == "") {
        return new Error("user id must be filled");
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return new Error("user not found");
      }

      if (user.role === "client") {
        return new Error("user already a client");
      }
      const updateUserRole = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { role: "client" } },
        { new: true }
      );
      return updateUserRole;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = {
  createParkingLot,
  applyForParkingLot,
  createParkingLotCategory,
};
