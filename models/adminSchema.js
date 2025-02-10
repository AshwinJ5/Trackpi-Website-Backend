const  mongoose  = require("mongoose");



const adminSchema=new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    adminType: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const AdminModel= mongoose.model('admins',adminSchema)

module.exports=AdminModel