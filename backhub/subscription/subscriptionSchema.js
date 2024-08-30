const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
    listenerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "listenerregister",
    },
    creatorid:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creatorregister",
    },
    podcastid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "creatorupload",
      },
    paymentstatus: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date
    },
    isactive: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("subscriptions", subscriptionSchema);