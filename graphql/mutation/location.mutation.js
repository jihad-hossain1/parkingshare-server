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
  DivisionType,
  UnionType,
  UpazilaType,
  DistrictType,
} = require("../../typeDefs/typeDefs");
const { default: mongoose } = require("mongoose");
const {
  Division,
  Union,
  Upazila,
  District,
} = require("../../models/location.models");

const updateDivision = {
  type: DivisionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  resolve: async (parent, { id, about, image }) => {
    try {
      // validation check
      if (id === "" && !mongoose.Types.ObjectId.isValid(id)) {
        return new Error("division are not valid or id is empty are not allow");
      } else if (about === "") {
        return new Error("about is empty are not allow");
      } else if (image === "") {
        return new Error("image link is empty are not allow");
      }

      // check division are found or not
      const division = await Division.findById(id);
      //   console.log(division);
      if (!division) {
        return new Error("division are not found");
      }

      // set update filed
      const updateDivi = await Division.findByIdAndUpdate(
        { _id: id },
        { $set: { about: about, image: image } },
        { new: true }
      );
      //   console.log(updateDivi);
      return updateDivi;
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateDistrict = {
  type: DistrictType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  resolve: async (parent, { id, about, image }) => {
    try {
      // validation check
      if (id === "" && !mongoose.Types.ObjectId.isValid(id)) {
        return new Error("district are not valid or id is empty are not allow");
      } else if (about === "") {
        return new Error("about is empty are not allow");
      } else if (image === "") {
        return new Error("image link is empty are not allow");
      }

      // check district are found or not
      const district = await District.findById(id);
      //   console.log(district);
      if (!district) {
        return new Error("district are not found");
      }

      // set update filed
      const updateDist = await District.findByIdAndUpdate(
        { _id: id },
        { $set: { about: about, image: image } },
        { new: true }
      );
      //   console.log(updateDist);
      return updateDist;
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateUpazila = {
  type: UpazilaType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  resolve: async (parent, { id, about, image }) => {
    try {
      // validation check
      if (id === "" && !mongoose.Types.ObjectId.isValid(id)) {
        return new Error("upazila are not valid or id is empty are not allow");
      } else if (about === "") {
        return new Error("about is empty are not allow");
      } else if (image === "") {
        return new Error("image link is empty are not allow");
      }

      // check upazila are found or not
      const upazila = await Upazila.findById(id);
      //   console.log(upazila);
      if (!upazila) {
        return new Error("upazila are not found");
      }

      // set update filed
      const updateUPazi = await Upazila.findByIdAndUpdate(
        { _id: id },
        { $set: { about: about, image: image } },
        { new: true }
      );
      //   console.log(updateUPazi);
      return updateUPazi;
    } catch (error) {
      return new Error(error);
    }
  },
};

const updateUnion = {
  type: UnionType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    about: { type: GraphQLString },
    image: { type: GraphQLString },
  },
  resolve: async (parent, { id, about, image }) => {
    try {
      // validation check
      if (id === "" && !mongoose.Types.ObjectId.isValid(id)) {
        return new Error("union are not valid or id is empty are not allow");
      } else if (about === "") {
        return new Error("about is empty are not allow");
      } else if (image === "") {
        return new Error("image link is empty are not allow");
      }

      // check union are found or not
      const union = await Union.findById(id);
      //   console.log(union);
      if (!union) {
        return new Error("union are not found");
      }

      // set update filed
      const updateUni = await Union.findByIdAndUpdate(
        { _id: id },
        { $set: { about: about, image: image } },
        { new: true }
      );
      //   console.log(updateUni);
      return updateUni;
    } catch (error) {
      return new Error(error);
    }
  },
};

module.exports = { updateDivision, updateDistrict, updateUpazila, updateUnion };
