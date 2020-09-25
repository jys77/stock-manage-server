const mongoose = require("mongoose");

const HistoryOutSchema = mongoose.Schema({
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: "Inventory",
    required: true,
  },
  priceOut: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  timeOut: {
    type: Date,
    required: true,
  },
});
HistoryOutSchema.set("timestamps", true);
const HistoryOutModal = mongoose.model("HistoryOut", HistoryOutSchema);
module.exports = HistoryOutModal;
