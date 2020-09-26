const express = require("express");
const Inventory = require("../models/Inventory");
const { isAuth } = require("../utils");
const router = express.Router();

router.get("/", isAuth, async (req, res) => {
  const keyword = req.query.keyword;
  const re = new RegExp(keyword, "i");
  const results = await Inventory.find({
    $and: [
      {
        $or: [
          { name: { $regex: re } },
          { category: { $regex: re } },
          { brand: { $regex: re } },
          { model: { $regex: re } },
        ],
      },
      { valid: true },
    ],
  });
  if (results) {
    const newResults = results.map((result) => {
      return {
        value: result._id,
        text: `${result.category}: ${result.brand}${result.model} ${result.name}`,
        stock: result.stock,
        unit: result.unit,
      };
    });
    res.send(newResults);
  } else {
    res.send([]);
  }
});

module.exports = router;
