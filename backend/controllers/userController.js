const User = require("../models/userModel")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const os = require("os")
const useragent = require("express-useragent")
const platform = require("platform")
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")


const trimer = (value)=> {
    return validator.trim(validator.escape(value).replace(" ", ""))
}

const createToken = (_id)=> {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "10d" })
}

const signupUser = async(req, res)=> {
    const {username, email, password} = req.body
    const newUsername = trimer(username)
    const newEmail = trimer(email)
    const newPassword = trimer(password)
    
    try{
        const user = await User.signup(newUsername, newEmail, newPassword)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }catch(error){
        res.status(401).json({error: error.message})
    }
    
}

const loginUser = async(req, res)=> {
    const {username, email, password} = req.body
    const newUsername = trimer(username)
    const newEmail = trimer(email)
    const newPassword = trimer(password)

    try{
        const user = await User.login(newUsername, newEmail, newPassword)
        const token = createToken(user._id)
        res.status(200).json({user, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//this should change because chat model is not ready now
const searchUser = async (req, res)=> {
    const {chat} = req.params
    const newChat = validator.trim(validator.escape(chat))

    try{
        const find = await User.findOne({username: chat})

        if(!find){
            throw Error("user not exist!")
        }

        

        res.status(200).json(find)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const myInfo = async (req, res)=> {
    const {id} = req.params
    const me = await User.find({_id: id})
    .populate("contacts")
    res.status(200).json(me)
}

const changeWallpaper = async(req, res)=> {
    
    const uploadedFile = req.file.filename
    const {id} = req.params
    const newWallpaper = await User.updateOne({_id: id}, {$set: {wallpaper: uploadedFile}})
}

const changeProfile = async(req, res)=> {
    const {id} = req.params
    const uploadedFile = req.file.filename
    const me = await User.find({_id: id}, {profile:1, _id:0})
    const newProf = await User.updateOne({_id: id}, {$set: {profile: uploadedFile}})
    /* .then(()=> {
        if(fs.existsSync("../../frontend/public/profiles/"+me[0].profile)){
            fs.unlink("../../frontend/public/profiles/"+me[0].profile, (err)=> {
                if(err){
                    console.log(err)
                }
                console.log("file deleted")
            })
            res.json(newProf)
        }
    })
    .catch((err)=> {
        console.log(err)
    }) */
}

const profileInfo = async(req, res)=> {
    const {myId, username, bio, date} = req.body
    try{
        const user = await User.profileInfo(myId, username, bio, date)
        console.log("changes submited")
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getOS = async(req, res)=> {
    /*const userAgent = req.useragent
    if(userAgent.isiPhone){
        var OS = "iPhone"
    }
    if(userAgent.isAndroid){
        var OS = "Android"
    }
    if(userAgent.isWindows){
        var OS = "Windows"
    }
    if(userAgent.isMac){
        var OS = "Mac"
    }
    res.status(200).json({device: os.version(), isMobile: userAgent.isMobile, platform: OS, version: userAgent.version, s: userAgent.source}) */
    
    const userAgent = req.headers['user-agent'];
    let deviceInfo = {
        userAgent: userAgent,
        deviceName: "Unknown",
        os: "Unknown"
    };

    // بررسی اینکه آیا کاربر از اندروید استفاده می‌کند
    if (/android/i.test(userAgent)) {
        const androidMatch = userAgent.match(/Android\s([0-9\.]+)/);
        if (androidMatch) {
            deviceInfo.os = `Android ${androidMatch[1]}`;
        }

        const deviceMatch = userAgent.match(/(Samsung|HTC|LG|Sony|Xiaomi|OnePlus|Nokia|Huawei|Motorola|Google)\s([^\s]+)/);
        if (deviceMatch) {
            deviceInfo.deviceName = deviceMatch[0];
        }
    }

    res.json(deviceInfo);

}

const addContacts = async (req, res)=> {
    const {adder, who} = req.body

    //this part is wrong...
    const check = await User.findOne({_id: adder, contacts: who})
    if(!check){
        const add = await User.updateOne({_id: adder}, {$push: {contacts: who}})
    }
}

const deleteContact = async(req, res)=> {
    const {me, who} = req.body
    const delCon = await User.updateOne({_id: me}, {$pull: {contacts: who}})

}

const contacts = async(req, res)=> {
    const {id} = req.params
    const allContacts = await User.find({_id: id})
}

const changeStatus = async(req, res)=> {
    const {id, status} = req.body
    /* console.log(id, status) */
    const changing = await User.updateOne({_id: id}, {$set: {status: status}})
}

const support = async(req, res)=> {
    const {email, message} = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mmdlivi2022@gmail.com",
            pass: "itbx rqka ovck hzme"
        }
    })

    const mailOptions = {
        from: email,
        to: "mmdlivi2022@gmail.com",
        subject: "reporting an issue",
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
            res.status(400).json({error: "something went wrnog!"})
        }else{
            console.log("Email sent: ", info.response)
            res.status(200).json({msg: "your email was sent to our support team"})
        }
    })

}

module.exports = { signupUser, loginUser, searchUser, myInfo, changeWallpaper, changeProfile, profileInfo, getOS, addContacts, deleteContact, changeStatus, support }