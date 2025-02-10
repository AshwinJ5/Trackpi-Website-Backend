const mongoose = require('mongoose');

// Define schema
const logSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  userAgent: { type: String },
  method: { type: String },
  url: { type: String },
  headers: { type: Object },
  visitedAt: { type: Date, default: Date.now }
});

// Create model
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
