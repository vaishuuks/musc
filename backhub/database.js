const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Music")
var db=mongoose.connection
db.on("error",console.error.bind("error"))
db.once("open",function(){
    console.log("db connection successfull");
})
module.export=db