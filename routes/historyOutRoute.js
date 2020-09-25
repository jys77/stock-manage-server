const express = require("express");
const HistoryOut = require("../models/HistoryOut");
const Inventory = require("../models/Inventory");
const { isAuth } = require("../utils");
const router = express.Router();

router.post("/:id", isAuth, async (req, res) => {
  const itemId = req.params.id;
  const newOut = new HistoryIn({
    inventory: itemId,
    priceOut: req.body.priceOut,
    count: req.body.count,
    timeOut: req.body.timeOut,
  });
  const savedOut = await newOut.save();
  const item = await Inventory.findById(itemId);
  item.stock += req.body.count;
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
  const ins = await HistoryOut({}).sort({ timeOut: -1 });
  if (ins) {
    res.send(ins);
  } else {
    res.status(401).send({ msg: "获取售出历史记录失败！" });
  }
});

export const router;