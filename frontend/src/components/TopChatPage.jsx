import { IoArrowBack } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import UserProfileInfo from "./UserProfileInfo";

const TopChatPage = ({result, location}) => {
    const navigate = useNavigate()

    const close = ()=> {
        navigate(-1)
    }

    const openActions = ()=> {
        const elem = document.querySelector(".actions")
        elem.style.display = "initial"
    }

    const closeActions = ()=> {
        const elem = document.querySelector(".actions")
        elem.style.display = "none"
    }

    const openUserProfile = ()=> {
        const elem = document.querySelector(".chatPage")
        elem.style.visibility = "hidden"
        const elem2 = document.querySelector(".userInfoCon")
        elem2.style.display = "initial"
    }

    return ( 
        <div className="topChatPage" onTouchStart={closeActions}>
            <IoArrowBack className="back" onClick={close} />
            <div className="info2" onClick={openUserProfile}>
                <img src={location === "H" ? "" : "/profiles/"+result.profile} className="profilePhoto"/>
                <div>
                    <p className="Sname">{result.username}</p>
                    <p className="status">last seen recently</p>
                </div>
            </div>
            <PiDotsThreeOutlineVerticalFill className="threeDots" onClick={openActions}  />
        </div>
     );
}
 
export default TopChatPage;