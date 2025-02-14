const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    companySize: { 
        type: String, 
        required: true,
        enum: ["1-10", "11-50", "51-100", "101-500", "501-1000", "1001-5000", "5001-10000", "10000+"],
    },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", CompanySchema);
