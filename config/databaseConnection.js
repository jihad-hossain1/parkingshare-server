const mongoose = require("mongoose");

const mongooseConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/parkingshare`);
    console.log("<------- Connected to MongoDB ------->");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
  }
};

module.exports = mongooseConnection;
