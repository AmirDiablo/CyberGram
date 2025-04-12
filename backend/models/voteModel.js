const mongoose = require("mongoose")
const Schema = mongoose.Schema

const choiceSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId, ref:"User",
        required: true
    },
    choice: {
        type: String,
        required: true
    }
}, {timestamps: true})

const voteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId, ref:"User",
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId, ref: "Chat",
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    choices: { type: [choiceSchema] },
    isQuiz: {
        type: Boolean,
        required: true
    },
    isMultiple: {
        type: Boolean,
        required: true
    },
    isAnonymous: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Vote = mongoose.model("vote", voteSchema)

module.exports = Vote