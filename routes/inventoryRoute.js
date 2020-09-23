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
  Inventory.find({})
    .sort({ createdAt: -1 })
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      res.send([]);
    });
});

router.get("/categories", (req, res) => {
  Inventory.find({}, { category: 1 })
    .distinct("category")
    .then((cats) => {
      const newCats = cats.map((cat) => {
        return {
          text: cat,
          value: cat,
        };
      });
      res.send(newCats);
    })
    .catch((err) => {
      res.send([]);
    });
});

router.get("/brands", (req, res) => {
  Inventory.find({}, { brand: 1 })
    .distinct("brand")
    .then((brands) => {
      const newBrands = brands.map((brand) => {
        return {
          text: brand,
          value: brand,
        };
      });
      res.send(newBrands);
    })
    .catch((err) => {
      res.send([]);
    });
});

router.get("/names", (req, res) => {
  Inventory.find({}, { name: 1 })
    .distinct("name")
    .then((names) => {
      const newNames = names.map((name) => {
        return {
          text: name,
          value: name,
        };
      });
      res.send(newNames);
    })
    .catch((err) => {
      res.send([]);
    });
});

module.exports = router;
