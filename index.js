// const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

// require("dotenv").config();
// const express = require("express");
// const { createHandler } = require("graphql-http/lib/use/express");
// // const contextMiddleware = require("./middleware/authMiddleware");
// const cors = require("cors");
// const mongooseConnection = require("./config/databaseConnection");
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => "world",
//       },
//     },
//   }),
// });
// const port = process.env.PORT || 8000;

// const app = express();
// app.use(cors());

// mongooseConnection();

// app.all(
//   "/api/v1/parkingshare",
//   createHandler({
//     schema,
//     graphiql: process.env.NODE_ENV === "development",
//     // context: contextMiddleware,
//   })
// );

// app.listen(port, console.log(`server runnng on port ${port}`));

require("dotenv").config();
const app = require("./app");
const mongooseConnection = require("./config/databaseConnection");

const port = process.env.PORT || 8000;

mongooseConnection()
  .then(() => {
    app.listen(port, console.log(`server runnng on port ${port}`));
  })
  .catch((error) => console.log("connect failed!!!", error));
