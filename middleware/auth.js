const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  //check if theres token in the header
  if (!token) {
    return res.status(401).json({ msg: "unauthorised" }); //401 is unauthorised, NO TOKEN FOUND
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
