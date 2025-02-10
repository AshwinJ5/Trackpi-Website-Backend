const express = require("express");
const multer = require("../middlewares/multer");
const newsController = require("../controllers/newsControllerAdmin");
const verifyJwt = require("../middlewares/jwtMiddleware");

const router = express.Router();

//add news
router.post("/news", verifyJwt, multer.single("newsFile"), newsController.addNewsDetails);

// get all news
router.get("/newsdetails", newsController.getAllNewsDetails);

// update a news
router.put("/news/:id", verifyJwt, multer.single("newsFile"), newsController.editNewsDetails);

// Route to delete an employee by ID
router.delete("/newsdetails/:id", verifyJwt, newsController.deleteANewsDetail);

module.exports = router;
