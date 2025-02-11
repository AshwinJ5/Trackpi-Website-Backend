const Selection = require("../models/Selection");

// Fetch selected items
exports.getSelection = async (req, res) => {
  const selections = await Selection.find();
  res.json(selections);
};

// Save selected vouchers and tools
exports.saveSelection = async (req, res) => {
  const { selectedVouchers, selectedTools, noGift } = req.body;

  // Ensure max selections are respected
  if (selectedVouchers.length > 2) {
    return res.status(400).json({ message: "Only 2 vouchers can be selected" });
  }

  if (selectedTools.length > 4) {
    return res.status(400).json({ message: "Only 4 tools can be selected" });
  }

  const selection = new Selection({ selectedVouchers, selectedTools, noGift });
  await selection.save();
  res.json({ message: "Selection saved successfully", selection });
};
