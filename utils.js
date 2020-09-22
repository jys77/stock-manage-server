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

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "用户token错误！" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ msg: "您无权进行操作！" });
  }
};

module.exports = {
  getToken,
  isAuth,
};
