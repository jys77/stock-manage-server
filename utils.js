const jwt = require("jsonwebtoken");
const config = require("./config");

const getToken = (user) => {
  return jwt.sign(
    {
      ...user,
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
