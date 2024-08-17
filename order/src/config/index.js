require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_ORDER_URI,
  jwtSecret: process.env.JWT_SECRET || "secret",
};