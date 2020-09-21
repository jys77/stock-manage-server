const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
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

const inventoryModal = mongoose.model("Inventory", inventorySchema);
module.exports = inventoryModal;
