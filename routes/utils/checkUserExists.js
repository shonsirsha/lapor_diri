const User = require("../../models/User");

const checkUserExists = async (field, data) => {
  // check by field
  let user;

  let query = {};
  query[field] = data;

  user = await User.findOne(query);

  return user;
};

module.exports = checkUserExists;
