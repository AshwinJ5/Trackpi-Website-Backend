const mongoose = require("mongoose");
const Company = require("../models/companySchema");

// 🔹 Register a new company
exports.registerCompany = async (req, res) => {
    try {
        const { companyName, industry, website, pincode, country, state, city, companySize } = req.body;

        // 🔸 Validate required fields
        if (!companyName || !industry || !website || !pincode || !country || !state || !city || !companySize) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // 🔸 Save new company
        const newCompany = new Company({ companyName, industry, website, pincode, country, state, city, companySize });
        await newCompany.save();

        res.status(201).json({ message: "Registration successful!", company: newCompany });
    } catch (error) {
        console.error("Error registering company:", error.message);
        res.status(500).json({ error: "Error registering company" });
    }
};

// 🔹 Get all companies
exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error.message);
        res.status(500).json({ error: "Error fetching companies" });
    }
};

// 🔹 Delete a company by ID
exports.deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        // 🔸 Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid company ID!" });
        }

        const company = await Company.findByIdAndDelete(id);
        if (!company) {
            return res.status(404).json({ error: "Company not found!" });
        }

        res.status(200).json({ message: "Company deleted successfully!" });
    } catch (error) {
        console.error("Error deleting company:", error.message);
        res.status(500).json({ error: "Error deleting company" });
    }
};
