const headingForNewsPartnership = require('../models/headingForNewsPartnershipSchema'); 

// Create a heading
exports.createNewHeadingForNewsPartnership = async (req, res) => {
  
  try {
    const existingDocument = await headingForNewsPartnership.findOne();
    if (existingDocument) {
      return res.status(400).json({
        message: "Heading already exists. Please update it instead.",
      });
    }
    const {  newsHeading, partnershipHeading, partnershipSubHeading } = req.body;
    const newHeadings = new headingForNewsPartnership({
        newsHeading,
        partnershipHeading,
        partnershipSubHeading,
    });

    await newHeadings.save();
    res.status(200).json({ message: 'Heading created successfully', newHeadings });
  } catch (error) {
    res.status(500).json({ message: 'Error creating heading', error });
  }
};

// get headings
exports.getAllHeadingForNewsPartnership = async (req, res) => {
  try {
    const headings = await headingForNewsPartnership.find();
    res.status(200).json(headings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving headings', error });
  }
};

// Update heading
exports.updateHeadingForNewsPartnership = async (req, res) => {
  try {
    const existingDocument = await headingForNewsPartnership.findOne();
    if (!existingDocument) {
      return res.status(404).json({
        message: "Heading not found. Please create one first.",
      });
    }

    const { newsHeading, partnershipHeading, partnershipSubHeading } = req.body;

    // Check if no data is incoming
    const noIncomingData =
      newsHeading === undefined &&
      partnershipHeading === undefined &&
      partnershipSubHeading === undefined;

    if (noIncomingData) {
      return res.status(400).json({
        message: "No data provided to update the headings",
      });
    }

    // Check if there are no changes
    const noChanges =
      (newsHeading === undefined || newsHeading === existingDocument.newsHeading) &&
      (partnershipHeading === undefined ||
        partnershipHeading === existingDocument.partnershipHeading) &&
      (partnershipSubHeading === undefined ||
        partnershipSubHeading === existingDocument.partnershipSubHeading);

    if (noChanges) {
      return res.status(304).send(); // Respond with 304 if no changes are detected
    }

    // Update fields only if they are provided
    if (newsHeading !== undefined) {
      existingDocument.newsHeading = newsHeading;
    }
    if (partnershipHeading !== undefined) {
      existingDocument.partnershipHeading = partnershipHeading;
    }
    if (partnershipSubHeading !== undefined) {
      existingDocument.partnershipSubHeading = partnershipSubHeading;
    }

    // Save the updated document
    await existingDocument.save();

    res.status(200).json({
      message: "Heading updated successfully",
      heading: existingDocument,
    });
  } catch (err) {
    console.error("Error updating headings:", err.message);
    res.status(500).json({
      error: "An error occurred while updating the headings",
    });
  }
};
