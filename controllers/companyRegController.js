const Company = require("../models/companySchema");

exports.registerCompany = async (req, res) => {
    try {
        const { companyName, industry, website, pinCode, country, state, city, companySize } = req.body;

        if (!companyName || !industry || !website || !pinCode || !country || !state || !city || !companySize) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        console.log("Received Data:", req.body);

        const newCompany = new Company({ companyName, industry, website, pinCode, country, state, city, companySize });
        await newCompany.save();

        res.status(201).json({ message: "Registration successful!", company: newCompany });
    } catch (error) {
        res.status(500).json({ error: "Error registering company" });
    }
};


exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: "Error fetching companies" });
    }
};


exports.deleteCompany = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Company ID is required!" });
        }

        const company = await Company.findByIdAndDelete(id);
        if (!company) {
            return res.status(404).json({ error: "Company not found!" });
        }

        res.status(200).json({ message: "Company deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting company" });
    }
};