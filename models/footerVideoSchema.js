const mongoose = require("mongoose");

const footerVideoSchema = new mongoose.Schema({
  videofile1: {
    type: String, 
    required: false,
  },
  videourl1: {
    type: String, 
    required: false,
  },
  videofile2: {
    type: String, 
    required: false,
  },
  videourl2: {
    type: String, 
    required: false,
  },
  videofile3: {
    type: String, 
    required: false,
  },
  videourl3: {
    type: String, 
    required: false,
  },
  videoheading: {
    type: String, 
    required: false,
  },
  imagefile: {
    type: String, 
    required: false,
  },
  imageheading: {
    type: String, 
    required: false,
  },
});

const FooterVideo = mongoose.model("FooterVideo", footerVideoSchema);
module.exports = FooterVideo;
