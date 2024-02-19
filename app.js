const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
// const contextMiddleware = require("./middleware/authMiddleware");
const cors = require("cors");
const schema = require("./schema/schemas");

const app = express();
app.use(cors());

app.all(
  "/api/v1/parkingshare",
  createHandler({
    schema,
    graphiql: process.env.NODE_ENV === "development",
    // context: contextMiddleware,
  })
);

module.exports = app;
