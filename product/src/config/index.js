require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGODB_PRODUCT_URI,
  jwtSecret: process.env.JWT_SECRET || "secret",
};