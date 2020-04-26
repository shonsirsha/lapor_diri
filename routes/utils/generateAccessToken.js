const jwt = require("jsonwebtoken");
const config = require("config");
const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "5s" });
};

module.exports = generateAccessToken;
