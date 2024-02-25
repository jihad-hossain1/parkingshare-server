const mongoose = require("mongoose");

const addressType = new mongoose.Schema({
  area: {
    type: String,
    required: [true, "area filed are required"],
  },
  _map: {
    type: String,
    required: [true, "map filed are required"],
  },
});

const pricetype = new mongoose.Schema({
  _time: {
    type: String,
    required: [true, "time filed are required"],
  },
  cost: {
    type: Number,
    required: [true, "cost filed are required"],
  },
});

const avilableLottype = new mongoose.Schema({
  bay: {
    type: Number,
    required: [true, "please give a number of bay"],
  },
  token: {
    type: String,
    required: [true, "please give a token of bay"],
  },
});

const parkingLotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name are required"],
    },

    image: {
      type: String,
      required: [true, "image are required"],
    },

    address: {
      type: addressType,
      required: [true, "Address are required"],
    },

    price: {
      type: [pricetype],
      required: [true, "price are required"],
    },

    avilableLot: {
      type: [avilableLottype],
      required: [true, "avilablelot are required"],
    },

    lotType: {
      type: String,
      enum: ["casual", "longTerm"],
      default: "casual",
    },

    status: {
      type: String,
      enum: ["pending", "approve", "reject"],
      default: "pending",
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "userid are required"],
      ref: "User",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "categoryId are required"],
      ref: "Category",
    },

    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "location are required"],
      ref: "Union",
    },
  },
  { timestamps: true }
);

const ParkingLot =
  mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);

module.exports = ParkingLot;
