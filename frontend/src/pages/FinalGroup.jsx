import { IoArrowBack } from "react-icons/io5";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"
import { useState } from "react";

const FinalGroup = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {list, myId} = state
    const [file, setFile] = useState()
    const [gapName, setGapName] = useState()

    const close = ()=> {
        navigate(-1)
    }

    const create = async()=> {
        const formData = new FormData()
        formData.append("file", file)
        const response = await axios.post("http://localhost:3000/api/chat/createGap/?members="+list+"&owner="+myId+"&name="+gapName, formData)
        const json = await response.json()
    }

    return ( 
        <div className="final">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p>New Group</p>
            </div>

            <div className="finalDiv">
                <div>
                    <MdOutlineAddAPhoto className="addPhotoIcon"/>  
                    <input type="file" name="file" id="file3" onChange={(e)=> setFile(e.target.files[0])} />
                </div>
                <input type="text" placeholder="Enter group name" onChange={(e)=> setGapName(e.target.value)} value={gapName} />
            </div>

            <div className="br"></div>

            <div className="members">
                <p className="membersTitle">members</p>

                <div className="membersList">

                </div>
            </div>

            <div className="nextStage" onClick={create}>
                <IoCheckmarkSharp className="tickIcon" />
            </div>
        </div>
     );
}
 
export default FinalGroup;