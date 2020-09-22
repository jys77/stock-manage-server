const express = require("express");
const Inventory = require("../models/Inventory");
const { isAuth } = require("../utils");
const router = express.Router();

router.post("/add", isAuth, (req, res) => {
  const newItem = new Inventory({
    name: req.body.name,
    unit: req.body.unit,
    category: req.body.category ? req.body.category : "未分类",
    brand: req.body.brand ? req.body.category : "",
    model: req.body.model ? req.body.model : "",
  });
  newItem.save().then((data) => {
    res.status(201).send({
      msg: "商品创建成功！",
      data,
    });
  });
});

router.get("/", isAuth, (req, res) => {
  Inventory.find({}).then((items) => {
    res.send(items);
  });
});

module.exports = router;
