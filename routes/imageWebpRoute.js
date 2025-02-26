const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const router = express.Router();

router.get("/uploads/webp/*", async (req, res) => {
  const imagePath = path.join(__dirname, "..", req.path.replace("/uploads/webp", "/uploads"));
  
  const ext = path.extname(imagePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return res.status(400).send("Invalid image format. Only JPG, JPEG, and PNG are supported.");
  }

  if (!fs.existsSync(imagePath)) {
    return res.status(404).send("Image not found");
  }

  try {
    const webpBuffer = await sharp(imagePath).webp({ quality: 80 }).toBuffer();
    res.set("Content-Type", "image/webp");
    res.send(webpBuffer);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
  }
});

module.exports = router; // ✅ Ensure we export the router
