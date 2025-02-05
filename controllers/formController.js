const formModel = require("../models/connectusFormSchema");

// Add a new form submission
exports.addForm = async (req, res) => {
  try {
    const { fullName, phone, email, location, info_from, message } = req.body;

    // Validate required fields
    if (!fullName || !phone || !email || !location || !info_from || !message) {
      return res.status(400).json({ error: "Fields required." });
    }

    // Validate country code in phone number
    const phoneRegex = /^\+\d{1,3}\s\d{7,12}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: "Invalid phone number. Please include a valid country code (e.g., +91 9876543210)." });
    }

    // Validate email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address. Please provide a valid email (e.g., example@domain.com)." });
    }

    // Create a new form entry
    const formAdd = await formModel.create({
      fullName,
      phone,
      email,
      location,
      info_from,
      message,
    });

    // Respond with success message and created form data
    res.status(201).json({
      message: "Form submitted successfully",
      data: formAdd,
    });
  } catch (err) {
    console.error("Error adding form:", err); // Logs full error details
    
    if (err.name === 'ValidationError') {
        const errorMessages = Object.values(err.errors).map(error => error.message);
        return res.status(400).json({ error: errorMessages.join(', ') });
    }

    return res.status(500).json({ error: `Internal Server Error: ${err.message}` }); // Show actual error
}
}

// Get all form submissions
exports.getForm = async (req, res) => {
  try {
    // Fetch all forms from the database
    const forms = await formModel.find();

    // Check if forms exist
    if (!forms.length) {
      return res.status(404).json({ message: "No forms found." });
    }

    // Respond with the fetched forms
    res.status(200).json(forms);
  } catch (err) {
    console.error("Error fetching forms:", err);
    res.status(500).json({ error: "Failed to fetch forms. Please try again later." });
  }
};
