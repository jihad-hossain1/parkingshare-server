const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const contextMiddleware = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId; // Assuming your JWT payload includes the userId

      // Here, you can perform additional logic to fetch user data from your database
      // For example, fetch user details based on userId from the database

      // Assuming you have a User model
      const user = await User.findById(userId);

      if (user) {
        return {
          user: user, // Pass the authenticated user object to the context
        };
      } else {
        throw new Error("Invalid user token");
      }
    } catch (error) {
      throw new Error("Authentication failed");
    }
  } else {
    throw new Error("Authorization header not found");
  }
};

module.exports = contextMiddleware;
