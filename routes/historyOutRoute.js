const express = require("express");
const HistoryOut = require("../models/HistoryOut");
const Inventory = require("../models/Inventory");
const { isAuth } = require("../utils");
const router = express.Router();

router.post("/:id", isAuth, async (req, res) => {
  const itemId = req.params.id;
  const newOut = new HistoryOut({
    inventory: itemId,
    priceOut: req.body.priceOut,
    count: req.body.count,
    timeOut: req.body.timeOut,
  });
  const savedOut = await newOut.save();
  const item = await Inventory.findById(itemId);
  item.stock -= req.body.count;
  const savedItem = await item.save();

  if (savedOut && savedItem) {
    res.status(201).send({
      msg: `成功售出 ${savedItem.name} ${savedOut.count}${savedItem.unit}！`,
      data: savedOut,
    });
  } else {
    res.status(401).send({ msg: "操作失败!" });
  }
});

router.get("/", isAuth, async (req, res) => {
  const start = req.query.start;
  const end = req.query.end;
  const history = await HistoryOut.aggregate([
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
        timeOut: {
          $gte: new Date(start),
          $lt: new Date(end),
        },
      },
    },
  ]).sort({ timeOut: -1 });

  if (history && history !== []) {
    const results = history.map((item) => {
      return {
        _id: item._id,
        inventory: item.inventory,
        priceOut: item.priceOut,
        count: item.count,
        timeOut: item.timeOut,
        name: item.infos[0].name ? item.infos[0].name : "",
        category: item.infos[0].category ? item.infos[0].category : "",
        brand: item.infos[0].brand ? item.infos[0].brand : "",
        model: item.infos[0].model ? item.infos[0].model : "",
        unit: item.infos[0].unit ? item.infos[0].unit : "",
      };
    });
    res.send(results);
  } else {
    res.send([]);
  }
});

router.get("/stats", isAuth, async (req, res) => {
  const stats = await HistoryOut.aggregate([
    {
      $project: {
        day: {
          $substr: ["$timeOut", 0, 10],
        },
        priceOut: 1,
        count: 1,
      },
    },
    {
      $group: {
        _id: "$day",
        total: { $sum: { $multiply: ["$priceOut", "$count"] } },
      },
    },
    {
      $sort: { _id: -1 },
    },
  ]);
  if (stats) {
    res.send(stats.reverse());
  } else {
    res.send([]);
  }
});

module.exports = router;
