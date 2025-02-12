const express = require("express");
const { getSelection, saveSelection } = require("../controllers/selectionController");

const router = express.Router();

router.get("/", getSelection);
router.post("/", saveSelection);

module.exports = router;
