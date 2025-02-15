const news = require("../models/newsSchema");
const path = require("path");
const fs = require("fs");
exports.addNewsDetails = async (req, res) => {
  try {
    const { newsLink } = req.body;

    const newsFile = req.file ? `/uploads/news/${req.file.filename}` : null;

    const latestNews = new news({
      newsLink,
      newsFile,
    });
    await latestNews.save();
    res.status(200).json(latestNews);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// Edit news details
exports.editNewsDetails = async (req, res) => {
  const { newsLink, newsFile } = req.body;
  const { id } = req.params;
  const uploadedNewsFile = req.file
    ? `/uploads/news/${req.file.filename}`
    : newsFile;

  try {
    if (!id) {
      return res.status(400).json({ error: "News ID is required" });
    }

    if (!newsLink && !uploadedNewsFile) {
      return res
        .status(400)
        .json({
          error: "At least one field (newsLink or newsFile) is required",
        });
    }

    const existingNews = await news.findById(id);
    if (!existingNews) {
      return res.status(404).json({ error: "News not found" });
    }

    const isSameNewsLink = newsLink === existingNews.newsLink;
    const isSameNewsFile = uploadedNewsFile === existingNews.newsFile;

    if (isSameNewsLink && isSameNewsFile) {
      return res.status(304).json({ message: "No changes detected" });
    }

    const updateFields = {};
    if (newsLink && !isSameNewsLink) updateFields.newsLink = newsLink;
    if (uploadedNewsFile && !isSameNewsFile)
      updateFields.newsFile = uploadedNewsFile;

    const updatedNews = await news.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json({ message: "News updated successfully", updatedNews });
  } catch (error) {
    console.error("Error updating news details:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All news
exports.getAllNewsDetails = async (req, res) => {
  try {
    const newsDetails = await news.find();
    res.status(200).json(newsDetails);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching employees", details: error.message });
  }
};

// Delete Employee by ID
exports.deleteANewsDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNews = await news.findByIdAndDelete({ _id: id });
    if (deletedNews.newsFile) {
      const filePath = path.join(__dirname, "..", deletedNews.newsFile); // Adjust the path based on your project structure

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    if (!deletedNews) {
      return res.status(404).json({ error: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully", deletedNews });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting News", details: error.message });
  }
};
