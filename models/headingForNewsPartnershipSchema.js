const mongoose = require("mongoose");

const headingForNewsPartner = new mongoose.Schema({
  newsHeading: {
    type: String, 
    required: false,
  },
  partnershipHeading: {
    type: String, 
    required: false,
  },
  partnershipSubHeading: {
    type: String, 
    required: false,
  }
});

const headingForNewsPartnership = mongoose.model("headingNewsPartner", headingForNewsPartner);
module.exports = headingForNewsPartnership;
