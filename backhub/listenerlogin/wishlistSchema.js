const mongoose = require("mongoose");

const WishlistSchema = mongoose.Schema({
    listenerid: {
    type: String,
    required: true,
  },
  podcastid: {
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref: "creatorupload",
  }
  
});
module.exports = mongoose.model("wishlist", WishlistSchema);
