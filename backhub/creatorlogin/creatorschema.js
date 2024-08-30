const mongoose=require("mongoose")
const creatorschema=new mongoose.Schema(
    {
        firstname:{type:String},
        lastname:{type:String},
        gender:{type:String},
        dob:{type:String},
        mobile:{type:Number},
        street:{type:String},
        city:{type:String},
        state:{type:String},
        pincode:{type:Number},
        country:{type:String},
        email:{type:String},
        password:{type:String},
        image:{type:Object}
    }
)
module.exports=new mongoose.model("creatorregister",creatorschema)