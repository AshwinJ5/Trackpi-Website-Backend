const mongoose = require('mongoose');

const partnershipSchema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    companylogo:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const partners = mongoose.model('partners', partnershipSchema)
module.exports=partners

