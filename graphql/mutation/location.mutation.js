const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { DivisionType } = require("../../typeDefs/typeDefs");
const { default: mongoose } = require("mongoose");
const { Division } = require("../../models/location.models");

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

module.exports = { updateDivision };
