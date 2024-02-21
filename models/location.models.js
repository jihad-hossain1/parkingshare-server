const mongoose = require("mongoose");

const divisionSchema = new mongoose.Schema({
  zid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bn_name: {
    type: String,
  },
  url: {
    type: String,
  },
  about: { type: String },
  image: { type: String },
});

const districtSchema = new mongoose.Schema({
  zid: { type: String, required: true, unique: true },
  division_zid: { type: String, required: true },
  bn_name: { type: String },
  lot: { type: String },
  lon: { type: String },
  url: { type: String },
  about: { type: String },
  image: { type: String },
  name: {
    type: String,
    required: true,
  },
});

const upazilaSchema = new mongoose.Schema({
  zid: { type: String, required: true, unique: true },
  district_zid: { type: String },
  bn_name: { type: String },
  url: { type: String },
  about: { type: String },
  image: { type: String },
  name: {
    type: String,
    required: true,
  },
});

const unionSchema = new mongoose.Schema({
  zid: { type: String, required: true, unique: true },
  upazilla_zid: { type: String },
  bn_name: { type: String },
  url: { type: String },
  about: { type: String },
  image: { type: String },
  name: {
    type: String,
    required: true,
  },
});

const Union = mongoose.models.Union || mongoose.model("Union", unionSchema);

const Upazila =
  mongoose.models.Upazila || mongoose.model("Upazila", upazilaSchema);

const District =
  mongoose.models.District || mongoose.model("District", districtSchema);

const Division =
  mongoose.models.Division || mongoose.model("Division", divisionSchema);

module.exports = { Division, District, Upazila, Union };
