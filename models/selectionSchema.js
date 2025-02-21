const mongoose = require("mongoose");

const SelectionSchema = new mongoose.Schema({
  selectedVouchers: [{ type: String, required: true }], // Array of voucher IDs
  selectedTools: [{ type: String, required: true }], // Array of tool IDs
  noGift: { type: Boolean, default: false }, // User chooses no gift
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

module.exports = mongoose.model("Selection", SelectionSchema);
