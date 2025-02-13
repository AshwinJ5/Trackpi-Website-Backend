const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    industry: { type: String, required: true },
    website: { type: String, required: true },
    pinCode: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    companySize: { 
        type: String, 
        required: true,
        enum: ["1-10", "11-50", "51-100", "101-500", "501-1000", "1001-5000", "5001-10000", "10000+"],
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", CompanySchema);
