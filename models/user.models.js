const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const billingType = new mongoose.Schema({
  token: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
});
const cartType = new mongoose.Schema({
  total: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
});
const reserveType = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
});
const favoriteType = new mongoose.Schema({
  parkingLotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ParkingLot",
  },
});

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "client", "admin"],
    default: "user",
  },
  billing: [billingType],

  carts: [cartType],

  reserve: [reserveType],

  favorite: [favoriteType],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
