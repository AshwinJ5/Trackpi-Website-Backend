const express = require("express");
const router = express.Router();
const headingForNewsPartnership = require("../controllers/headingForNewsPartnershipController");
const verifyJwt = require("../middlewares/jwtMiddleware");

// post a partner detail
router.post("/createnew", verifyJwt, headingForNewsPartnership.createNewHeadingForNewsPartnership);

// get all partner detail
router.get("/getallheading", headingForNewsPartnership.getAllHeadingForNewsPartnership);

// update a partner detail
router.patch("/updateallheading", verifyJwt, headingForNewsPartnership.updateHeadingForNewsPartnership);

module.exports = router;
