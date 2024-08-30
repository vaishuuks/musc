const mongoose=require("mongoose");
const creatorpodcastschema= new mongoose.Schema({
  
  
  podcastname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  coverimage: {
    type: Object,
    required: true,
  },
  audio: {
    type: Object,
    required: true,
  },
  creatorid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"creatorregister"
  },
})
module.exports=mongoose.model("creatorupload",creatorpodcastschema);