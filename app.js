const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
// const contextMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const mongooseConnection = require("./config/databaseConnection");
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});

const app = express();
app.use(cors());

// mongooseConnection();

app.all(
  "/api/v1/parkingshare",
  createHandler({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    // context: contextMiddleware,
  })
);

module.exports = app;
