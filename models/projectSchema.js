const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
    minlength: [3, "Full name must be at least 3 characters long"],
    maxlength: [64, "Full name cannot be longer than 64 characters"],
    trim: true,
  },
  contactNumber: {
    type: String,
    required: [true, "Please provide your phone number"],
    trim: true,
    validate: {
      validator: function (v) {
        // Country code should start with a '+' followed by 1-3 digits, and the phone number should be 7-12 digits.
        return /^\+\d{1,3}\s\d{7,12}$/.test(v);
      },
      message: "Phone number must include a valid country code (e.g., +91 9876543210) and be 7 to 12 digits long.",
    },
  },
  emailAddress: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  projectName: { type: String, required: true },
  problemSolved: { type: String, required: true },
  beneficiaries: { type: String, },
  successReason: { type: String, },
  skills: { type: String },
  summary: { type: String, required: true},
  file: { type: String }, // Added for file URL
  fileName:{type: String },
  qualification: { type: String, required: true },
  userType: { type: String, required: true },
  institute_company: { type: String, required: true },



}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
