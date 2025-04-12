const mongoose = require("mongoose")
const Schema = mongoose.Schema

const choiceSchema = new Schema({

})

const userVoteSchema = new Schema({
    voter: {
        type: Schema.Types.ObjectId, ref: "User",
        required: true
    },
    vote: {
        type: Schema.Types.ObjectId,
        required: true
    },
    choice: {
        type: [String],
        required: true
    }
}, {timestamps: true})

const UserVote = mongoose.model("UserVote", userVoteSchema)
module.exports = UserVote