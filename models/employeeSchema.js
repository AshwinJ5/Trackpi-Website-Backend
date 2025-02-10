const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empID: {
        type: String,
        
        unique: true,
        validate: {
            validator: function (v) {
              // Ensures empID starts with "TPE1D" followed by exactly 6 digits
              return /^TPEID\d{6}$/.test(v);
            },
            message: "Employee ID must start with 'TPE1D' followed by 6 digits (e.g., TPE1D123456).",
          },
    },
    name: {
        type: String,
        required: true,
        minlength: [3, "Full name must be at least 3 characters long"],
        maxlength: [64, "Full name cannot be longer than 64 characters"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: "Please enter a valid email address",
    },
        
    },
    desig: {
        type: String,
       
    },
    image: {
        type: String, 
      
    },
    selfIntroduction: {
      type: String,
      validate: {
          validator: function (v) {
              const wordCount = v.trim().split(/\s+/).length; // Count words
              const charCount = v.length; // Count characters
  
              // Validate both word count (between 30-40 words) and character count (up to 540 characters)
              return wordCount >= 30 && wordCount <= 40 && charCount <= 540;
          },
          message: "Self-introduction must be between 30 and 40 words, and no more than 540 characters.",
      },
  },
    
    phone: { 
        type: String,
        trim: true,
      
     },
    fullAddress: { type: String,
        minlength: [6, "Address must be at least 6 characters long."],
     },
    gender: { type: String },
    dob: { type: Date },
    bloodGroup: { type: String },
    dateOfJoining: { type: Date},
    jobRole: { type: String},
    employeeStatus: { type: String},
    jobLevel: { type: String},
   socialmedia1:{
    type:String
   },
   socialmedia2:{
    type:String
   },
   socialmedia3:{
    type:String
   },
   socialmedia4:{
    type:String
   },
   category: { type: String, enum: ['employee', 'sales', 'intern'] },
   platform1:{type:String},
   platform2:{type:String},
   platform3:{type:String},
   platform4:{type:String},
   feedback: {  type:String, default:'' },
  profileImage: { type: String ,
    
  },
  Certificate: { type: String },
  image:{type:String},
  businessCard:{type:String},
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
