const express = require("express")
const {createVote, allVotes, submitVotes, result} = require("../controllers/voteController")

const router = express.Router()

router.post("/create", createVote)
router.get("/allVotes/:chatId", allVotes)
router.post("/submitVote", submitVotes)
router.post("/result", result)

module.exports = router