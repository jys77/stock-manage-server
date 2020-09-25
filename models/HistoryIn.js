const mongoose = require("mongoose");

const HistoryInSchema = mongoose.Schema({
  inventory: {
    type: mongoose.Schema.ObjectId,
    ref: "Inventory",
    required: true,
  },
  priceIn: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  timeIn: {
    type: Date,
    required: true,
  },
});
HistoryInSchema.set("timestamps", true);
const HistoryInModal = mongoose.model("HistoryIn", HistoryInSchema);
module.exports = HistoryInModal;
