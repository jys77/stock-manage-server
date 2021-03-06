const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
    required: true,
  },
});

inventorySchema.set("timestamps", true);

const inventoryModal = mongoose.model("Inventory", inventorySchema);
module.exports = inventoryModal;
