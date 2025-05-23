const mongoose=require("mongoose")
const {Schema}=mongoose

const adminSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
})

module.exports=mongoose.model("Admin",adminSchema)