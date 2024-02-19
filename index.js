require("dotenv").config();
const app = require("./app");
const mongooseConnection = require("./config/databaseConnection");

const port = process.env.PORT || 8000;

mongooseConnection()
  .then(() => {
    app.listen(port, console.log(`server runnng on port ${port}`));
  })
  .catch((error) => console.log("connect failed!!!", error));
