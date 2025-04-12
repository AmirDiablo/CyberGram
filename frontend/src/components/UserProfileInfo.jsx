import { IoArrowBack } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ProfileActions from "./ProfileActions";
import QRCode from "react-qr-code";
import { IoQrCode } from "react-icons/io5";

const UserProfileInfo = ({result, myId}) => {

    const close = ()=> {
        const elem = document.querySelector(".userInfoCon")
        elem.style.display = "none"
        const elem2 = document.querySelector(".chatPage")
        elem2.style.visibility = "visible"
    }

    const open = ()=> {
        const elem = document.querySelector(".profileActions")
        elem.style.display = "initial"
    }

    const closeActions = ()=> {
        const elem = document.querySelector(".profileActions")
        elem.style.display = "none"
    }

    const openQrcode = ()=> {
         const elem = document.querySelector(".qrCodeCon")
         elem.style.display = "block"
    }

    return ( 
        <div className="userInfoCon" >
            <ProfileActions result={result} myId={myId}/>
            <div className="userProfileInfo" onTouchStart={closeActions}>
                <IoArrowBack className="back" onClick={close} />
                <img src="/profiles/profile.png" className="profilePhoto2"/>
                <div className="userStatus">
                    <p>{result.username}</p>
                    <p className="status">last seen recently</p>
                </div>
                <PiDotsThreeOutlineVerticalFill className="threeDots" onClick={open} />
            </div>

            <div className="profileInfo2" onTouchStart={closeActions}>
                <p className="profileInfoText">Info</p>
                <div>
                    <div>
                        <p className="accountNumber">+98 910 040 6127</p>
                        <p className="accountText">Mobile</p>
                    </div>
                    {result.bio && <div> <p className="bio">{result.bio}</p><p className="bioText">Bio</p> </div>}
                    <div>
                        <p className="Account">{result.username}</p>
                        <p className="AccountText">Account</p>
                        <IoQrCode className="qrcodeIcon" onClick={openQrcode} />
                    </div>
                </div>
            </div>

            <div className="qrCodeCon">
            <QRCode className="qrCode" value={result._id} />
            </div>
        </div>
     );
}
 
export default UserProfileInfo;