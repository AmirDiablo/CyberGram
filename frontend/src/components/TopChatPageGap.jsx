import { IoArrowBack } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


const TopChatPageGap = ({result, location}) => {
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

    const openGapInfo = ()=> {
        const elem = document.querySelector(".chatPage")
        elem.style.visibility = "hidden"
        const elem2 = document.querySelector(".gapInfoCon")
        elem2.style.display = "initial"
    }

    return ( 
        <div className="topChatPage" onTouchStart={closeActions} onClick={openGapInfo}>
            <IoArrowBack className="back" onClick={close} />
            <div className="info2" > {/* onClick */}
                <img src={location === "H" ? "" : "/profiles/"+result.profile} className="profilePhotoGap"/>
                <div>
                    <p className="Sname">{result.name}</p>
                    <p className="status">{result.members.length} members</p>
                </div>
            </div>
            <PiDotsThreeOutlineVerticalFill className="threeDots" onClick={openActions}  />
        </div>
     );
}
 
export default TopChatPageGap;