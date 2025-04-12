const express = require("express")
const { AllChats, singleChat, searchInChat, deleteChat, createGap, leaveGap, addMember, editGap, editGap2, changePermissions } = require("../controllers/chatController")
const uploadedProf = require("../uploadChatProfile")

const router = express.Router()

router.get("/:id", AllChats)
router.get("/one/:id", singleChat)
router.post("/search", searchInChat)
router.post("/delete", deleteChat)
router.post("/createGap", uploadedProf.single("file"), createGap)
router.post("/leave", leaveGap)
router.post("/addMember", addMember)
router.post("/editGap", uploadedProf.single("file"), editGap)
router.post("/editGap2", editGap2)
router.post("/changePermissions", changePermissions)

module.exports = router