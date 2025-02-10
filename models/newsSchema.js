const mongoose=require('mongoose')
const newsSchema= new mongoose.Schema({
    newsLink:{
        type:String,
        required:true
    },
    newsFile:{
        type:String,
        required:true
    }
},{ timestamps: true })
const news=mongoose.model('news',newsSchema)
module.exports=news