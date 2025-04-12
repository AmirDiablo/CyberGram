const mongoose = require("mongoose")
const Chat = require("../models/chatModel")
const Message = require("../models/messageModel")

const AllChats = async (req, res)=> {
    const {id} = req.params
    const chatId = new mongoose.Types.ObjectId(id)
    const result = await Chat.find({members: id})
    .populate("members")
    res.status(200).json(result)
}

const singleChat = async (req, res)=> {
    const {id} = req.params
    const chat = await Chat.find({_id: id})
    res.status(200).json(chat)
}

const searchInChat = async(req, res)=>{
    
}

const deleteChat = async(req, res)=> {
    const {chatId} = req.body
    const delChat = await Chat.deleteOne({_id: chatId})
    const delMessages = await Message.deleteMany({chat: chatId})
}

const createGap = async(req, res)=> {
    const {members, owner, name} = req.query
    const uplaodedFile = req.file.filename
    const membersArr = members.split(",")
    
    try{
        if(!name){
            throw Error("enter a name for your gap")
        }
        const newGap = await Chat.create({name: name, profile: uplaodedFile, members: membersArr, type: "gap", admin: owner})
        res.status(200).json(newGap)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const leaveGap = async(req, res)=> {
    const {userId, chatId} = req.body
    const leave = await Chat.updateOne({_id: chatId}, {$pull: {members: userId}})
}

const addMember = async(req, res)=> {
    const {chatId, newMembers} = req.body
    const AddMember = await Chat.updateOne({_id: chatId}, {$push: {members: newMembers}})
}

const editGap = async(req, res)=> {
    const uploaded = req.file.filename
    const {name, des, id} = req.query
    const editGap = await Chat.updateOne({_id: id}, {$set: {name, description: des, profile: uploaded}})
    const gap = await Chat.findOne({_id: id})
    .populate("members")
    res.status(200).json(gap)
}

const editGap2 = async(req, res)=> {
    const {name, des, id} = req.body
    const editGap = await Chat.updateOne({_id: id}, {$set: {name, description: des}})
    const gap = await Chat.findOne({_id: id})
    .populate("members")
    res.status(200).json(gap)
}

const changePermissions = async(req, res)=> {
    const {chatId, textMessage, audioFile, voiceMessage, image, addUser} = req.body
    const edit = await Chat.updateOne({_id: chatId}, {$set: {permissions: {textMessage, audioFile, voiceMessage, image, addUser}}})
}

module.exports = {AllChats, singleChat, searchInChat, deleteChat, createGap, leaveGap, addMember, editGap, editGap2, changePermissions}