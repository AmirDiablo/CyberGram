const mongoose = require("mongoose")
const Schema = mongoose.Schema

const memberSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User"}
})

const permissionSchema = new Schema({
    textMessage: {type: Boolean, required: true},
    image: {type: Boolean, required: true},
    audioFile: {type: Boolean, required: true},
    voiceMessage: {type: Boolean, required: true},
    addUser: {type: Boolean, required: true}
})

const chatSchema = new Schema({
    name: {
        type: String
    },
    profile: {
        type: String,
        default: "gap.jfif"
    },
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    type: {
        type: String,
        required: true
    },
    admin: {
        type: String
    },
    description: {
        type: String
    },
    permissions: {type: permissionSchema}
}, {timestamps: true})

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat