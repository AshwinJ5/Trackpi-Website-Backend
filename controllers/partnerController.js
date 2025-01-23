const Partners = require('../models/partnershipSchema'); 

// Create a new partner
exports.createPartner = async (req, res) => {
  const {  companyname, description } = req.body;
  const companylogo=req.file ? `/uploads/partner/${req.file.filename}` : null;

  try {
    const newPartner = new Partners({
      companylogo,
      companyname,
      description,
    });

    await newPartner.save();
    res.status(200).json({ message: 'Partner created successfully', newPartner });
  } catch (error) {
    res.status(500).json({ message: 'Error creating partner', error });
  }
};

// Get all partners
exports.getAllPartners = async (req, res) => {
  try {
    const partners = await Partners.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving partners', error });
  }
};

// Get a single partner by ID
exports.getPartnerById = async (req, res) => {
  const { id } = req.params;

  try {
    const partner = await Partners.findById(id);

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving partner', error });
  }
};

// Update a partner by ID
exports.updatePartner = async (req, res) => {
  const { id } = req.params;
  const { companyname, description } = req.body;
  const companylogo = req.file ? `/uploads/partner/${req.file.filename}` : undefined; // Set undefined if no file is uploaded

  try {
    // Build the update object dynamically
    const updateFields = {};
    if (companyname) updateFields.companyname = companyname;
    if (description) updateFields.description = description;
    if (companylogo) updateFields.companylogo = companylogo;

    // Update the partner
    const updatedPartner = await Partners.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.status(200).json({ message: 'Partner updated successfully', updatedPartner });
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ message: 'Error updating partner', error });
  }
};


// Delete a partner by ID
exports.deletePartner = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPartner = await Partners.findByIdAndDelete(id);

    if (!deletedPartner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.status(200).json({ message: 'Partner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting partner', error });
  }
};
