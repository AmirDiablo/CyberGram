import laptop from "../assets/laptop.png"
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoQrCode } from "react-icons/io5";
import android from "../assets/android.png"
import ios from "../assets/ios.png"
import { useEffect, useState } from "react";
import {UAParser} from "ua-parser-js"

const Devices = () => {
    const [os, setOS] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        fetch("http://localhost:3000/api/users/os")
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setOS(data)
        })
    }, [])

    const close = ()=> {
        navigate(-1)
    }

    return ( 
        <div className="devices">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p className="ProfileInfoTitle">Devices</p>
            </div>
            <div style={{textAlign: "center", marginBottom: "20px"}}>
                <img src={laptop} className="laptop"/>
                <p className="deviceText">
                    Link <Link className="Link">Telegram Desktop</Link> or <Link className="Link">Telegram Web</Link> by scanning a QR code.
                </p>
                <div className="qrcodeButton">
                    <IoQrCode />
                    <p className="qrcodeText">Link Desktop Device</p>
                </div>
            </div>

            <div className="br"></div>

            <div className="thisDevice">
                <p className="thisDeviceText">This device</p>
                <div className="deviceInfo">
                    <img src={android} className="OSIcon" />
                    <div className="deviceInfoText">
                        <p className="deviceName">{os.deviceName}</p>
                        <p>Telegram {os.device} {os.os}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Devices;