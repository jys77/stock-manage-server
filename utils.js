const jwt = require("jsonwebtoken");
const config = require("./config");

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      username: user.username,
      password: user.password,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
};

module.exports = {
  getToken: getToken,
};
