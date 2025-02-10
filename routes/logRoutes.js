// routes/logRoutes.js
const express = require('express');
const { logRequestDetails } = require('../controllers/logController'); // Import the controller
const logSchema = require("../models/logSchema")


const router = express.Router();

// Use middleware for logging every request (global logging)
router.use(logRequestDetails);

// Optional: Define a route to fetch logs (for example, an admin route)
router.get('/logs', async (req, res) => {
  try {
    const logs = await logSchema.find(); // Assuming you want to fetch all logs
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logs', error: err });
  }
});

module.exports = router;
