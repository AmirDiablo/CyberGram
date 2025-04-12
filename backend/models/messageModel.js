const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId, ref:"User",
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId, ref: "Chat",
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message