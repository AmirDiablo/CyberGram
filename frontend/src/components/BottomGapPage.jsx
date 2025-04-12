import { RiEmojiStickerLine } from "react-icons/ri";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios"
import Voice from "./Voice";

const BottomGapPage = ({chatId}) => {
    const [message, setMessage] = useState("")
    const [file, setFile] = useState()
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const senderId = JSON.parse(localStorage.getItem("user")).user._id

    const send = async(_value)=> {
            /* await socket.emit("sendMessage", {senderId, message, chatId}) */
            document.querySelector(".messageInput").value = ""
            const response = await fetch("http://localhost:3000/api/message/sendToGap", {
                method: "POST",
                body: JSON.stringify({sender: senderId, content: message, chatId}),
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
                setChat(json)
                console.log("chat id is: " + chat)
            }
    }

    const sendImage = async()=> {
        const formData = new FormData()
        formData.append("file", file)
        const response = await axios.post("http://localhost:3000/api/message/sendImageGap/?sender="+senderId+"&chatId="+chatId, formData)
        if(response.status === 200) {
            console.log(response.data)
            console.log("everything is ok")
            /* await socket.emit("sendImage", {senderId, image: response.data, chatId}) */
        }
        if(response.status !== 200) {
            console.log("some thing went wrong")
        }
        
    }

    const closeActions = ()=> {
        const elem = document.querySelector(".actions")
        elem.style.display = "none"
    }

    //voice
    const openMicMenu = ()=> {
        if(isOpen){
            document.querySelector(".voice").style.display = "none"
            setIsOpen(!isOpen)
        }else{
            document.querySelector(".voice").style.display = "flex"
            setIsOpen(!isOpen)
        }
    }

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = async() => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            audioChunksRef.current = [];
            const formData = new FormData()
            formData.append("audio", audioBlob, "user-voice.wav")
            const response = await axios.post("http://localhost:3000/api/message/voiceGap/?sender="+senderId+"&chatId="+chatId, formData)
            if(response.status === 200) {
                console.log(response.data)
                console.log("everything is ok")
                /* await socket.emit("sendVoice", {senderId, voice: response.data, chatId}) */
            }
            if(response.status !== 200) {
                console.log("some thing went wrong")
            }
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        setAudioURL(null)
    };

    return ( 
        <div className="bottomChatPage">
            <RiEmojiStickerLine className="emoji" />
            <input type="text" className="messageInput" placeholder="Message" onChange={(e)=> setMessage(e.target.value)} value={message} />
            {message == "" ? <form className="imageSenderCon"><GrAttachment className="attached"/><input type="file" name="file" id="file" className="imageSenderInput" onInput={(e)=> setFile(e.target.files[0])} onChange={()=> sendImage(file)} /></form> : ""}
            <Voice start={startRecording} stop={stopRecording} isRecording={isRecording} audioURL={audioURL}/>
            {message != "" ? <IoSend  className="send" onClick={send}/> : <MdOutlineKeyboardVoice className="micIscon" onClick={openMicMenu} />}
        </div>
     );
}
 
export default BottomGapPage;