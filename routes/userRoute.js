const express = require("express");
const User = require("../models/User");
const { getToken } = require("../utils");
const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.find({
    username: req.body.username,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      username: signinUser.username,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "用户名或密码错误！" });
  }
});

module.exports = router;
