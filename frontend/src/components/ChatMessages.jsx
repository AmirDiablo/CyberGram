import { useEffect, useRef, useState } from "react";
import ToBottom from "./ToBottom";
import ActionsMenu from "./ActionsMenu";
import {format} from 'date-fns'
import io from "socket.io-client"
import { useEditContext } from "../hooks/useEditContext";
const socket = io.connect("http://localhost:3000")

const ChatMessages = ({result, chatId, changeFromChild, theme}) => {
    const [mess, setMess] = useState([])
    const [error, setError] = useState(null)
    const [socketMessage, setSocketMessage] = useState()
    const [endOfScrollbar, setEndOfScrollbar] = useState(false)
    const [msgId, setMsgId] = useState()
    const {flag, setFlag} = useEditContext()
    const scrollRef = useRef(null)

    const sender = JSON.parse(localStorage.getItem("user")).user._id
    const yourname = JSON.parse(localStorage.getItem("user")).user.username
    

    const getMessages = async ()=> {
        const response = await fetch("http://localhost:3000/api/message/pv", {
            method: "POST",
            body: JSON.stringify({sender, reciever: result._id }),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setMess(json)
        }
    }

    const handleScroll = ()=> {
        const divElem = document.querySelector(".chatMessage")
        /* console.log(divElem.scrollTop, divElem.scrollHeight) */
        if(divElem.scrollTop + divElem.scrollHeight <= divElem.scrollHeight){
            setEndOfScrollbar(false)
        }else{
            setEndOfScrollbar(true)
        }

    }

    useEffect(()=> {
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [mess])

    useEffect(()=> {
        getMessages()

        socket.emit("createRoom", chatId)
    }, [])

    
    useEffect(()=> {
        //get new text message
        socket.on("sendMessage", (info)=> {
            
            console.log("the message is: ", info.message)

            const messageCon = document.createElement("div")
            messageCon.setAttribute("class", "messageCon")
    
            const messageNumber = document.createElement("div")
            if(info.senderId !== sender){
                messageNumber.setAttribute("class", "message2")
            }else{
                messageNumber.setAttribute("class", "message1")
            }
            
            const con = document.querySelector(".newMessages")
            const newP = document.createElement("p")
            newP.setAttribute("class", "content")
            newP.innerText = info.message
            messageNumber.appendChild(newP)
            messageCon.appendChild(messageNumber)
            con.appendChild(messageCon)
            })

            //get new image message
            socket.on("sendImage", (info)=> {
                setSocketMessage(info)
                console.log(info)

                const messageCon = document.createElement("div")
                messageCon.setAttribute("class", "messageCon")
        
                const messageNumber = document.createElement("div")
                if(info.senderId !== sender){
                    messageNumber.setAttribute("class", "message2")
                }else{
                    messageNumber.setAttribute("class", "message1")
                }
                
                const con = document.querySelector(".newMessages")
        
                const newImage = document.createElement("img")
                newImage.setAttribute("class", "contentImage")
                newImage.src = "http://localhost:3000/uploads/images/"+info.image
                messageNumber.appendChild(newImage)
                messageCon.appendChild(messageNumber)
                con.appendChild(messageCon)
                })


                //get new voice message
                socket.on("sendVoice", (info)=>{
                    console.log(info)
                    console.log("voice is: ", info.voice)
                    const messageCon = document.createElement("div")  
                    messageCon.setAttribute("class", "messageCon")    
                    const messageNumber = document.createElement("div")  
                    if(info.senderId !== sender){
                        messageNumber.setAttribute("class", "message2")
                    }else{
                        messageNumber.setAttribute("class", "message1")  
                    }
                    const con = document.querySelector(".newMessages")  
                    const newVoice = document.createElement("audio")
                    newVoice.setAttribute("class", "voiceMessage")
                    const newSource = document.createElement("source")
                    newSource.src = `http://localhost:3000/uploads/voices/${info.voice}`
                    newVoice.appendChild(newSource)
                    /* newVoice.setAttribute("src", `/voices/${info.voice}`) */
                    messageNumber.appendChild(newVoice)
                    messageCon.appendChild(messageNumber)
                    con.appendChild(messageCon)
                })
    }, [socket])


    const closeActions = ()=> {
        const elem = document.querySelector(".actions")
        elem.style.display = "none"
        setFlag(false)
    }

    const showMenu = (id)=> {
        if(!flag) {
            const elem = document.querySelector(".actionsMenu")
            elem.style.display = "initial"
            setMsgId(id)
            changeFromChild(id)
        }
    }

    const closeMenu = ()=> {
        const elem = document.querySelector(".actionsMenu")
        elem.style.display = "none"
        setMsgId(null)
    }


    
    return ( 
        <div ref={scrollRef} className="chatMessage hideScroll" onClick={closeActions} onScroll={handleScroll} >
            {msgId && <div onClick={closeMenu} className="layer"></div>}
            <ActionsMenu msgId={msgId} />
            {error && <div className="chatNotFound">{error}</div>}
            {mess.map((m)=> (
                <div key={m._id}>  {/* diplay messages diffrently base on sender name */}
                    {m.sender.username === yourname ? 
                        <div className="messageCon" onClick={()=> showMenu(m._id, "ok")} onTouchStart={closeMenu}>
                            <div className="message1" style={{backgroundColor: theme}} >
                                {m.content.search(/\.(mp3|wav)/i) !== -1 ? <audio src={"http://localhost:3000/uploads/voices/"+m.content} controls className="voiceMessage"></audio> : <>{m.content.search(/\.(png|jpg|jpeg|jfif)/i) !== -1 ? <img src={"http://localhost:3000/uploads/images/"+m.content} className="contentImage" /> : <p className="content">{m.content}</p>}</>}
                                <p className="msgTime1">{format(new Date(m.createdAt), "HH:mm")}</p>
                            </div>
                        </div> : 
                        <div className="messageCon" onClick={()=> showMenu(m._id, "ok")} onTouchStart={closeMenu}>
                            <div className="message2" style={{backgroundColor: theme}} >
                                {m.content.search(/\.(mp3|wav)/i) !== -1 ? <audio src={"http://localhost:3000/uploads/voices/"+m.content} controls className="voiceMessage"></audio> : <>{m.content.search(/\.(png|jpg|jpeg|jfif)/i) !== -1 ? <img src={"http://localhost:3000/uploads/images/"+m.content} className="contentImage" /> : <p className="content">{m.content}</p>}</>}
                                <p className="msgTime2">{format(new Date(m.createdAt), "HH:mm")}</p>
                            </div>
                        </div>
                    }
                </div>
            ))}
            
            <div className="newMessages"></div>
            {endOfScrollbar === true ? "" : <ToBottom />}
        </div>
     );
}
 
export default ChatMessages;