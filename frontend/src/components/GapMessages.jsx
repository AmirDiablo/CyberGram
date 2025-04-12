import { useEffect, useState } from "react";
import ActionsMenu from "./ActionsMenu";
import { useLocation } from "react-router-dom";
import {format} from 'date-fns'

const GapMessages = ({chatId, theme}) => {
    const [mess, setMess] = useState([])
    const [error, setError] = useState(null)
    const [msgId, setMsgId] = useState()
    
    const yourname = JSON.parse(localStorage.getItem("user")).user.username

    const getMessages = async ()=> {
        const response = await fetch("http://localhost:3000/api/message/gap", {
            method: "POST",
            body: JSON.stringify({chatId}),
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

    useEffect(()=> {
        getMessages()
        console.log(mess)
    }, [])

    const closeActions = ()=> {
        const elem = document.querySelector(".actions")
        elem.style.display = "none"
    }

    const showMenu = (id)=> {
        const elem = document.querySelector(".actionsMenu")
        elem.style.display = "initial"
        setMsgId(id)
        changeFromChild(id)
    }

    const closeMenu = ()=> {
        const elem = document.querySelector(".actionsMenu")
        elem.style.display = "none"
    }

    return ( 
        <div className="chatMessage" onClick={closeActions}>
            <ActionsMenu msgId={msgId} />
            {error && <div className="chatNotFound">{error}</div>}
            {mess.map((m)=> (
                <div key={m._id}>  {/* diplay messages diffrently base on sender name */}
                    {m.sender.username === yourname ? 
                        <div className="messageCon" onClick={()=> showMenu(m._id, "ok")} onTouchStart={closeMenu}>
                            <div className="message1" style={{backgroundColor: theme}} >
                                {m.content.search(/\.(mp3|wav)/i) !== -1 ? <audio src={"/voices/"+m.content} controls className="voiceMessage"></audio> : <>{m.content.search(/\.(png|jpg|jpeg|jfif)/i) !== -1 ? <img src={"/images/"+m.content} className="contentImage" /> : <p className="content">{m.content}</p>}</>}
                                <p className="msgTime1">{format(new Date(m.createdAt), "HH:mm")}</p>
                            </div>
                        </div> : 
                        <div className="messageCon" onClick={()=> showMenu(m._id, "ok")} onTouchStart={closeMenu}>
                            <div className="message2" style={{backgroundColor: theme}} >
                                {m.content.search(/\.(mp3|wav)/i) !== -1 ? <audio src={"/voices/"+m.content} controls className="voiceMessage"></audio> : <>{m.content.search(/\.(png|jpg|jpeg|jfif)/i) !== -1 ? <img src={"/images/"+m.content} className="contentImage" /> : <p className="content">{m.content}</p>}</>}
                                <p className="msgTime2">{format(new Date(m.createdAt), "HH:mm")}</p>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </div>
     );
}
 
export default GapMessages;