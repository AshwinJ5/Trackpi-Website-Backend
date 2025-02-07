const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // Your multer setup
const path = require("path");
const fs = require("fs");



// Upload route for images
router.post("/upload", upload.array("images", 6), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  // Store file URLs
  const fileUrls = req.files.map(file => `/uploads/images/${file.filename}`);

  res.status(200).json({ message: "Images uploaded successfully", fileUrls });
});


// Get all images
router.get("/getImages", (req, res) => {
    const imagesDirectory = path.join(__dirname, "../uploads/images");
  
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch images", error: err });
      }
  
      // Generate URLs for all images
      const imageUrls = files.map(file => `/uploads/images/${file}`);
  
      res.status(200).json({ images: imageUrls });
    });
  });



module.exports = router;
