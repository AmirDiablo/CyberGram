import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import AddProfile from "../components/AddProfile";
import { BsChat } from "react-icons/bs";
import { MdLockOutline } from "react-icons/md";
import { MdDevices } from "react-icons/md";

const Setting = () => {
    const navigate = useNavigate()
    const [result, setResult] = useState([])
    

    const close = ()=> {
        navigate(-1)
    }

    const myId = JSON.parse(localStorage.getItem("user")).user._id

    const myInfo = async ()=> {
        const response = await fetch("http://localhost:3000/api/users/myInfo/"+myId)
        const json = await response.json()

        if(response.ok){
            setResult(json)
        }
    }

    useEffect(()=> {
        myInfo()
    }, [])

    const open = (page)=> {
        navigate("/"+page, {state: {me: result}})
    }

    return ( 
        <div className="Setting">
            <div className="topSetting">
                <IoArrowBack className="back" onClick={close} />
                {result.map((item)=> (
                    <div className="info2" style={{marginLeft: "10px", paddingBottom: "10px"}}>
                        <img src={"http://localhost:3000/uploads/profiles/"+item.profile}  className="settingProfilePhoto"/>
                        <div className="settingUserInfo">
                            <p className="Sname">{item.username}</p>
                            <p className="status">last seen recently</p>
                        </div>

                        <AddProfile />
                    </div>
                ))}
            </div>
            
            <div className="accountInfo">
                <p className="account">Account</p>
                {result.map((item)=> (
                    <div>
                        <div>
                            <p className="accountNumber">+98 910 040 6127</p>
                            <p className="accountText">Tap to change phone number</p>
                        </div>
                        <div onClick={()=> open("profileInfo")}>
                            <p className="bio">{item.bio}</p>
                            <p className="bioText">bio</p>
                        </div>
                    </div>
                ))}
                
            </div>

            <div className="br"></div>

            <div className="settingInfo">
                <p className="setting">Setting</p>
                <div onClick={()=> open("chatSetting")}>
                    <p className="chatIcon"><BsChat /></p>
                    <p className="chatText">Chat setting</p>
                </div>
                <div>
                    <p className="lockIcon"><MdLockOutline /></p>
                    <p className="privacyText">Privacy and Security</p>
                </div>
                <div onClick={()=> open("devices")}>
                    <p className="deviceIcon"><MdDevices /></p>
                    <p className="devicesText">Devices</p>
                </div>
            </div>
        </div>
     );
}
 
export default Setting;