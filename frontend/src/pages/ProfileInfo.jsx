import { IoArrowBack } from "react-icons/io5";
import { BsCalendarDate } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfileInfo } from "../hooks/useProfileInfo";
import { useState } from "react";
import { LuEraser } from "react-icons/lu";

const ProfileInfo = () => {
    const navigate = useNavigate()
    const {state} = useLocation()
    const {me} = state
    const {profileInfo, error, isLoading} = useProfileInfo()
    const [username, setUsername] = useState(me[0].username)
    const [bio, setBio] = useState(me[0].bio)
    const [date, setDate] = useState(me[0].date)

    const close = ()=> {
        navigate(-1)
    }

    const handleClick = async()=> {
        await profileInfo(username, bio, date)
    }

    const handledelete = ()=> {
        const elem = document.querySelector(".changeBioInput")
        elem.value = ""
    }

    console.log(me[0])

    return ( 
        <form className="profileInfo">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p className="ProfileInfoTitle">Profile Info</p>
            </div>

            <div className="changeNameDIV">
                <p className="changeName">Your name</p>
                <input type="text" className="changeNameInput" placeholder={me[0].username ? me[0].username : "name"} onChange={(e)=> setUsername(e.target.value)} value={username} />
            </div>

            <div className="br"></div>

            <div className="changeBioDIV">
                <p className="changeBio">Your bio</p>
                <input type="text" className="changeBioInput"  placeholder={me[0].bio ? me[0].bio : "bio"}  onChange={(e)=> setBio(e.target.value)} value={bio} />
            </div>

            <div className="br" style={{color: "rgba(240, 248, 255, 0.39)", height: "max-content", padding: "10px", fontSize: "14px"}}>
                You can add a few lines about yourself. Choose who can see your bio in settings.
            </div>

            <div className="dateDIV">
                <p className="date">Your birthday</p>
                <input type="date" className="dateInput" onChange={(e)=> setDate(e.target.value)} value={date} />
            </div>

            <div className="submitChanges" onClick={handleClick}>Submit changes ✔</div>

            {error && <div className="error">{error}</div>}
        </form>
     );
}

export default ProfileInfo;