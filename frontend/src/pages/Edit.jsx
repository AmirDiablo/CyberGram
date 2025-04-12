import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import { AiOutlineLink } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"

const Edit = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {chat} = state

    const [gapName, setGapName] = useState(chat.name)
    const [file, setFile] = useState(chat.profile)
    const [Description, setDescription] = useState(chat.description)
    const [some, setSome] = useState()

    const close = ()=> {
        navigate(-1)
    }

    const submitChanges = async()=> {
        if(file === chat.profile){
            const response = await fetch("http://localhost:3000/api/chat/editGap2", {
                method: "POST",
                body: JSON.stringify({name: gapName, des: Description, id: chat._id}),
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            const json = await response.json()
            navigate("/gapchatpage", {state: {chat: json}})
        }else{
            const formData = new FormData()
            formData.append("file", file)

            const response = await axios.post("http://localhost:3000/api/chat/editGap/?name="+gapName+"&des="+Description+"&id="+chat._id, formData)
            const json = await response.json()
            navigate("/gapchatpage", {state: {chat: json}})
        }
    
        
    }

    const handleClick = (page)=> {
        navigate("/"+page, {state: {chat}})
    }

    return ( 
        <div className="Edit">
            <div className="userProfileInfo">
                <IoArrowBack className="back" onClick={close} />
                <p style={{color: "white"}}>Edit</p>
                <IoCheckmarkSharp className="checkMark" onClick={submitChanges}/>
            </div>

            <div className="editGap">
                <div className="div1">
                    <img src={"/profiles/"+chat.profile} className="groupProf" />
                    <input type="text" className="editGapName" placeholder="Enter group name" onChange={(e)=> setGapName(e.target.value)} value={gapName} />
                </div>

                <div className="div2">
                    <div className="newProfdiv">
                        <MdOutlineAddAPhoto className="changephotoIcon"/> 
                        <p className="newProfText">Set New Photo</p>
                    </div>
                    <input type="file" name="file" id="file4" onChange={(e)=> setFile(e.target.files[0])} />
                </div>

                <div className="hr"></div>

                <div className="div3">
                    <input type="text" placeholder="Description (optional)" className="editDescription" onChange={(e)=> setDescription(e.target.value)} value={Description} />
                </div>

                <div className="br"></div>
            </div>

            <div className="membersEdit">
                    <div onClick={()=> handleClick("permissions")}>
                        <LuKeyRound className="keyIcon" />
                        <p>Permissions</p>
                    </div>

                    <div onClick={()=> handleClick("inviteLink")}>
                        <AiOutlineLink className="linkIcon" />
                        <p>Invite Links</p>
                    </div>
                </div>
        </div>
     );
}
 
export default Edit;