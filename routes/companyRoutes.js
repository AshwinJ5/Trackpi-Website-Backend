const express = require("express");
const companyController = require ("../controllers/companyRegController")

const router = express.Router();

// Company Registration Route
router.post("/", companyController.registerCompany);

// Get All Companies Route
router.get("/", companyController.getCompanies);

router.delete('/:id', companyController.deleteCompany)

module.exports = router;
