const jwt = require("jsonwebtoken");
const config = require("config");
const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.get("jwtSecret"), { expiresIn: "15m" });
};

module.exports = generateAccessToken;
