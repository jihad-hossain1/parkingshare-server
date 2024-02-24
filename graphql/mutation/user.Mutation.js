const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");
const { UserType } = require("../../typeDefs/typeDefs");
const User = require("../../models/user.models");

const createUser = {
  type: UserType,
  args: {
    fullname: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, { fullname, email, password, image }) => {
    console.log({ fullname, email, password, image });
    try {
      if (fullname === "") {
        return new Error("fullname field are not allow empty");
      } else if (email === "") {
        return new Error("email field are not allow empty");
      } else if (password === "") {
        return new Error("password field are not allow empty");
      } else if (image === "") {
        return new Error("image field are not allow empty");
      }

      const userAlready = await User.findOne({ email: email });
      if (userAlready) {
        return new Error("user email alredy exist");
      }

      const newuser = new User({
        fullname: fullname,
        email: email,
        password: password,
        image: image,
      });
      const saveUser = await newuser.save();
      return saveUser;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    password: { type: GraphQLString },
    photo: { type: GraphQLString },
  },

  resolve: async (parent, args) => {
    return await User.findByIdAndUpdate(
      args.id,
      {
        $set: {
          name: args.name,
          phone: args.phone,
          password: args.password,
          photo: args.photo,
        },
      },
      { new: true }
    );
  },
};

const deleteUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (parent, args) => {
    return await User.findByIdAndDelete(args.id);
  },
};

module.exports = { createUser, updateUser, deleteUser };
