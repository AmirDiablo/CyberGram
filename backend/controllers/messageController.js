const Message = require("../models/messageModel")
const Chat = require("../models/chatModel")
const mongoose = require("mongoose")

const sendMessage = async(req, res)=> {
    const {sender, content, reciever} = req.body
    const recieverId = new mongoose.Types.ObjectId(reciever)
    const sender2 = new mongoose.Types.ObjectId(sender)

    const arr = [sender, reciever]

    const exist = await Chat.findOne({members: {$all: [sender, reciever]}})  //before this i wrote {members: [sender, reciever]} and this lead to make a new chat

    if(!exist){
        const chat = await Chat.create({ members: arr, type: "pv" })
        const message = await Message.create({content, sender, chat: chat._id})
    }
    if(exist){
        const message = await Message.create({content, sender, chat: exist._id})
    }


    /* const arr = [
        {userId: sender},
        {userId: reciever}
    ]

    const exist = await Chat.find({ members: {$all: [{$elemMatch: {userId: sender}}, {$elemMatch: {userId: reciever}}] } })
    console.log(exist)

    if(!exist){
        const chat = await Chat.create({ members: arr, type: "pv" })
        const message = await Message.create({content, sender, chat: chat._id})
    }
    if(exist){
        const message = await Message.create({content, sender, chat: exist._id})
    } */
}

const getMessages = async (req, res)=> {
    const {sender, reciever} = req.body
    
    try{
        const chat = await Chat.findOne({members: {$all: [sender, reciever]}})
        if(!chat){
            throw Error("no chat exist!")
        }
        const messages = await Message.find({chat: chat._id})
        .populate("sender")
        
        res.status(200).json(messages)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const sendImage = async(req, res)=> {
    const uploaded = req.file.filename
    const {sender, reciever} = req.query
    const recieverId = new mongoose.Types.ObjectId(reciever)
    const sender2 = new mongoose.Types.ObjectId(sender)

    const arr = [sender, reciever]

    const exist = await Chat.findOne({members: {$all: [sender, reciever]}})  //before this i wrote {members: [sender, reciever]} and this lead to make a new chat

    if(!exist){
        const chat = await Chat.create({ members: arr, type: "pv" })
        const message = await Message.create({content: uploaded, sender, chat: chat._id})
    }
    if(exist){
        const message = await Message.create({content: uploaded, sender, chat: exist._id})
    }

    res.status(200).json(uploaded)
}

const sendVoice = async(req, res)=> {
    const {sender, reciever} = req.query
    const voice = req.file.filename
    
    const arr = [sender, reciever]

    const exist = await Chat.findOne({members: {$all: [sender, reciever]}})  //before this i wrote {members: [sender, reciever]} and this lead to make a new chat

    if(!exist){
        const chat = await Chat.create({ members: arr, type: "pv" })
        const message = await Message.create({content: voice, sender, chat: chat._id})
    }
    if(exist){
        const message = await Message.create({content: voice, sender, chat: exist._id})
    }

    res.status(200).json(voice)
}

const deleteMessage = async(req, res)=> {
    const {id} = req.params
    const delMsg = await Message.deleteOne({_id: id})
}

const editMessage = async(req, res)=> {
    const {text, msgId} = req.body
    const editMsg = await Message.updateOne({_id: msgId}, {$set: {content: text}})
}

const getGapMessages = async(req, res)=> {
    const {chatId} = req.body

    try{
        const msg = await Message.find({chat: chatId})
        .populate("sender")
        if(!msg){
            throw Error("no message exist here")
        }
        console.log(msg)
        res.status(200).json(msg)
    }catch(error){
        res.status(400).json({error: error.message})
    }
    
}

const sendMessageToGap = async(req, res)=> {
    const {sender, content, chatId} = req.body
    const msg = await Message.create({sender, content, chat: chatId})
    res.status(200).json(msg)
}

const sendImageGap = async(req, res)=> {
    const uploaded = req.file.filename
    const {sender, chatId} = req.query
    try{
        const msg = await Message.create({sender: sender, content: uploaded, chat: chatId})
        res.status(200).json(uploaded)
    }catch(error){
        console.log(error)
    }
}

const sendVoiceGap = async(req, res)=> {
    const voice = req.file.filename
    const {sender, chatId} = req.query
    const msg = await Message.create({sender, content: voice, chat: chatId})
    res.status(200).json(voice)
}

module.exports = { sendMessage, getMessages, sendImage, sendVoice, deleteMessage, editMessage, getGapMessages, sendMessageToGap, sendImageGap, sendVoiceGap }