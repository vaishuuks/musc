const mongoose=require("mongoose")
const listenerschema=new mongoose.Schema
({
    firstname:{type:String},
    lastname:{type:String},
    dob:{type:String},
    gender:{type:String},
    street:{type:String},
    mobile:{type:Number},
    email:{type:String},
    password:{type:String},
    country:{type:String},
    image:{type:Object},
    city:{type:String},
    pincode:{type:Number}


})
module.exports=new mongoose.model("listenerregister",listenerschema)