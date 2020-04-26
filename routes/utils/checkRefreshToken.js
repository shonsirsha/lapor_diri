const User = require("../../models/User");

const checkRefreshToken = async (field, data) => {
  // check by variable field
  let user;
  if (field === "userId") {
    user = await User.findById(data);
  } else {
    let query = {};
    query[field] = data;

    user = await User.findOne(query);
  }

  return user;
};

module.exports = checkRefreshToken;
