import { IoArrowBack } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";
import ToggleBtn from "../components/ToggleBtn";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Permissions = () => {
    const {state} = useLocation()
    const {chat} = state
    const navigate = useNavigate()
    const [textMessage, setTextMessage] = useState(true)
    const [image, setImage] = useState(true)
    const [audioFile, setAudioFile] = useState(true)
    const [voiceMessage, setVoiceMessage] = useState(true)
    const [addUser, setAddUser] = useState(true)

    const submitChanges = async()=> {
        const response = await fetch("http://localhost:3000/api/chat/changePermissions", {
            method: "POST",
            body: JSON.stringify({chatId: chat._id, textMessage, image, audioFile, voiceMessage, addUser}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
    }

    const change = (name, value)=> {
        if(name==="textMessage"){
            setTextMessage(!value)
        }
        if(name==="image"){
            setImage(!value)
        }
        if(name==="audioFile"){
            setAudioFile(!value)
        }
        if(name==="voiceMessage"){
            setVoiceMessage(!value)
        }
        if(name==="addUser"){
            setAddUser(!value)
        }
    }

    const close = ()=> {
        navigate(-1)
    }

    return ( 
        <div className="permissions">
            <div className="userProfileInfo">
                <IoArrowBack className="back" onClick={close} />
                <p style={{color: "white"}}>Permissions</p>
                <IoCheckmarkSharp className="checkMark" onClick={submitChanges}/>
            </div>

            <p style={{color: "#40a5e4", marginLeft: "20px", fontWeight: "600"}}>What can members of this group do?</p>

            <div className="permissionsList">
                <div>
                    <p>Send Text Messages</p>
                    <ToggleBtn changePermission={change} item={"textMessage"} permission={chat.permissions.textMessage}/>
                </div>

                <div>
                    <p>Send Images</p>
                    <ToggleBtn changePermission={change} item={"image"} permission={chat.permissions.image}/>
                </div>

                <div>
                    <p>Send Audio files</p>
                    <ToggleBtn changePermission={change} item={"audioFile"} permission={chat.permissions.audioFile}/>
                </div>

                <div>
                    <p>Send Voice Messages</p>
                    <ToggleBtn changePermission={change} item={"voiceMessage"} permission={chat.permissions.voiceMessage}/>
                </div>

                <div>
                    <p>Add Users</p>
                    <ToggleBtn changePermission={change} item={"addUser"} permission={chat.permissions.addUser} />
                </div>
            </div>
        </div>
     );
}
 
export default Permissions;