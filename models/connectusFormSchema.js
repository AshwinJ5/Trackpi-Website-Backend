const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
      minlength: [3, "Full name must be at least 3 characters long"],
      maxlength: [64, "Full name cannot be longer than 64 characters"],
      trim: true,
    },
    phone: {
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
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      // unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Please enter a valid email address",
      },
    },
    location: {
      type: String,
      trim: true,
    },
    info_from: {
      type: String,
      required: [true, "Please select how you heard about us"],
      enum: {
        values: ["Social Media", "Search Engine", "Friend or Family", "Advertisement", "Others"],
        message: "Invalid value for 'infoFrom'. Must be one of: Social Media, Search Engine, Friend or Family, Advertisement, or Others.",
      },
    },
    message: {
      type: String,
      required: [true, "Please enter your message"],
      minlength: [10, "Message must be at least 10 characters long"],
    },
  },
  { timestamps: true }
);

const FormModel = mongoose.model("form", formSchema);
module.exports = FormModel;
