const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    feedback: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    listenerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listenerregister",
    },
    podcastid: {
        type: String,
        required: true,
    }
    ,
    creatorid: {
        type: String,
        required: true,
    },
    podcastname: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("listenerReview", reviewSchema);