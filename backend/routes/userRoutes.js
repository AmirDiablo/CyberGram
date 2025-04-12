const express = require("express")
const { signupUser, loginUser, searchUser, myInfo, changeWallpaper, changeProfile, profileInfo, getOS, addContacts, deleteContact, changeStatus, support } = require("../controllers/userController")
const requireAuth = require("../middlewares/requireAuth")
const uploadWallpaper = require("../uploadWallpaper")
const uploadedFile = require("../uploadProfile")

const useragent = require("express-useragent")

const router = express.Router()

router.post("/", signupUser)
router.post("/login", loginUser)
router.get("/search/:chat", searchUser)
router.get("/myInfo/:id", myInfo)
router.post("/wallpaper/:id", uploadWallpaper.single("file"), changeWallpaper)
router.post("/profile/:id", uploadedFile.single("file"), changeProfile)
router.post("/profileInfo", profileInfo)
router.get("/os", getOS)
router.post("/addContacts", addContacts)
router.post("/deleteContact", deleteContact)
router.post("/status", changeStatus)
router.post("/support", support)

module.exports = router