const User = require("../../models/User");

const changePassword = async (userObj, plainPassword) => {
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

module.exports = changePassword;
