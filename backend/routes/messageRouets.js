const express = require("express")
const { sendMessage, getMessages, sendImage, sendVoice, deleteMessage, editMessage, getGapMessages, sendMessageToGap, sendImageGap, sendVoiceGap } = require("../controllers/messageController")
const uploadImage = require("../uploadImage")
const uploadedVoice = require("../uploadVoice")

const router = express.Router()

router.post("/", sendMessage)
router.post("/pv", getMessages)
router.post("/sendImage", uploadImage.single("file"), sendImage)
router.post("/voice", uploadedVoice.single("audio"), sendVoice)
router.get("/delete/:id", deleteMessage)
router.post("/edit", editMessage)
router.post("/gap", getGapMessages)
router.post("/sendToGap", sendMessageToGap)
router.post("/sendImageGap", uploadImage.single("file"), sendImageGap)
router.post("/voiceGap", uploadedVoice.single("audio"), sendVoiceGap)

module.exports = router