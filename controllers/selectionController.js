const Selection = require("../models/selectionSchema");

// Fetch selected items
exports.getSelection = async (req, res) => {
  try {
    const selections = await Selection.find();
    res.json(selections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching selections", error: error.message });
  }
};

// Save selected vouchers and tools
exports.saveSelection = async (req, res) => {
  try {
    const { selectedVouchers = [], selectedTools = [], noGift = false } = req.body;

    // Validate input
    if (!Array.isArray(selectedVouchers) || !Array.isArray(selectedTools)) {
      return res.status(400).json({ message: "Invalid input format" });
    }

    if (selectedVouchers.length > 2) {
      return res.status(400).json({ message: "Only 2 vouchers can be selected" });
    }

    if (selectedTools.length > 4) {
      return res.status(400).json({ message: "Only 4 tools can be selected" });
    }

    const selection = new Selection({ selectedVouchers, selectedTools, noGift });
    await selection.save();

    res.json({ message: "Selection saved successfully", selection });
  } catch (error) {
    res.status(500).json({ message: "Error saving selection", error: error.message });
  }
};

