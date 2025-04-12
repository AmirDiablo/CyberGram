const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const { Server } = require("socket.io")
const http = require("http")
/* const Example = require("./models/example") */
const messageRoutes = require("./routes/messageRouets")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const voteRoutes = require("./routes/voteRoutes")
const UserVote = require("./models/userVotesModel")

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

app.use(cors())
app.use(bodyParser.json())

app.use("/api/message", messageRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/vote", voteRoutes)

io.on("connection", (socket)=> {

    socket.on("createRoom", (room)=>{
        socket.join(room)
        console.log(room)
    })

    socket.on("sendMessage", (info)=> {
        console.log(info)
        io.to(info.chatId).emit("sendMessage", {senderId: info.senderId, message: info.message})
        console.log("the message was send to room", info.chatId)
    })

    socket.on("sendImage", (info)=> {
        console.log(info)
        io.to(info.chatId).emit("sendImage", {senderId: info.senderId, image: info.image})
        console.log("the message was send to room: ", info.chatId)
    })

    socket.on("sendVoice", (info)=> {
        console.log(info)
        io.to(info.chatId).emit("sendVoice", {senderId: info.senderId, voice: info.voice})
        console.log("the voice is : ", info.voice)
    })

    socket.on("percentage", async(info)=> {
        const choices = info.options.flat()
        let arr = [];
        for(let i=0; i<choices.length; i++){
            const information = await UserVote.find({vote: info.id, choice: choices[i]})
            arr.push(information.length)
        }

        //plus the value of each arr element to find the sum of them (total number of votes)
        let num = 0;
        for(let j=0; j<choices.length; j++){
            num += arr[j]
        }
        
        let percent = [];
        for(let k=0; k<choices.length; k++){
            const per = parseInt(arr[k] * 100 / num)
            percent.push({percentage: per, option: choices[k]})
        }
        
        io.emit("percentage", percent)
    })

})


mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    server.listen(process.env.PORT, ()=> {
    console.log("server is listening on port", process.env.PORT)
})
    console.log("connected to database")
})
.catch((err)=> {
    console.log(err)
})