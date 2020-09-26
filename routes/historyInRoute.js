const express = require("express");
const HistoryIn = require("../models/HistoryIn");
const Inventory = require("../models/Inventory");
const { isAuth } = require("../utils");
const router = express.Router();

router.post("/:id", isAuth, async (req, res) => {
  const itemId = req.params.id;
  const newIn = new HistoryIn({
    inventory: itemId,
    priceIn: req.body.priceIn,
    count: req.body.count,
    timeIn: req.body.timeIn,
  });
  const savedIn = await newIn.save();
  const item = await Inventory.findById(itemId);
  item.stock += req.body.count;
  const savedItem = await item.save();

  if (savedIn && savedItem) {
    res.status(201).send({
      msg: `成功入库 ${savedItem.name} ${savedIn.count}${savedItem.unit}！`,
      data: savedIn,
    });
  } else {
    res.status(401).send({ msg: "操作失败!" });
  }
});

// router.get("/", isAuth, async (req, res) => {
//   const ins = await HistoryIn.find({}).sort({ timeIn: -1 });
//   if (ins) {
//     res.send(ins);
//   } else {
//     res.status(401).send({ msg: "获取入库历史记录失败！" });
//   }
// });

router.get("/", async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const history = await HistoryIn.aggregate([
    {
      $lookup: {
        from: Inventory.collection.name,
        localField: "inventory",
        foreignField: "_id",
        as: "infos",
      },
    },
    {
      $match: {
        timeIn: {
          $gte: new Date(start),
          $lt: new Date(end),
        },
      },
    },
  ]);

  if (history && history !== []) {
    const results = history.map((item) => {
      return {
        _id: item._id,
        inventory: item.inventory,
        priceIn: item.priceIn,
        count: item.count,
        timeIn: item.timeIn,
        name: item.infos[0].name ? item.infos[0].name : "",
        category: item.infos[0].category ? item.infos[0].category : "",
        brand: item.infos[0].brand ? item.infos[0].brand : "",
        model: item.infos[0].model ? item.infos[0].model : "",
      };
    });
    res.send(results);
  } else {
    res.send([]);
  }
});

module.exports = router;
