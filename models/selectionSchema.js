const mongoose = require("mongoose");

const SelectionSchema = new mongoose.Schema({
  selectedVouchers: [{ type: String }], // Stores voucher IDs
  selectedTools: [{ type: String }], // Stores tool IDs
  noGift: { type: Boolean, default: false }, // If the user chooses no gift
});

module.exports = mongoose.model("Selection", SelectionSchema);
