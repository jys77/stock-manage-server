const express = require("express");
const User = require("../models/User");
const { getToken } = require("../utils");
const router = express.Router();

router.post("/login", (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((loginUser) => {
      res.send({
        _id: loginUser.id,
        username: loginUser.username,
        token: getToken(loginUser),
      });
    })
    .catch((err) => {
      res.status(401).send({ msg: "用户名或密码错误！" });
    });
});

module.exports = router;
