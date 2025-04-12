import { BsFileImage } from "react-icons/bs";
import { IoColorPaletteSharp } from "react-icons/io5";
import { MdOutlineDarkMode } from "react-icons/md";  /* <MdOutlineDarkMode /> */
import { MdOutlineLightMode } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ColorPicker from "../components/ColorPicker";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";

const ChatSetting = () => {
    const {state} = useLocation()
    const {me} = state
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [error, setError] = useState()

    const close = ()=> {
        navigate(-1)
    }

    const getCookie = (cname)=> {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i=0; i < ca.length; i++){
            let c = ca[i]
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0){
                return c.substring(name.length, c.length)
            }
        }
        return "";
    }

    /* const myId = JSON.parse(localStorage.getItem("user")).user._id */

    const handleSubmit = (e)=> {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", file)
        axios.post("http://localhost:3000/api/users/wallpaper/"+me[0]._id, formData)
        .then((res)=> {
            setError(false)
            return res.json()
          })
          .catch((err)=> {
            setError(true)
          })
    }

    const changeColor = ()=> {
        const elem = document.querySelector(".color-chooser")
        elem.style.visibility = "visible"
    }

    return ( 
        <div className="chatSetting">
            <IoArrowBack className="back" onClick={close} />
            <div className="changeWall">
                <p className="wallpaperIcon"><BsFileImage /></p>
                <p className="wallpaperText">Change Chat Wallpaper</p>
                <input type="file" name="file" id="file2" onInput={(e)=> setFile(e.target.files[0])} onChange={handleSubmit} />
            </div>
            <div onClick={changeColor}>
                <p className="colorIcon"><IoColorPaletteSharp /></p>
                <p>Color Theme</p>
            </div>
            <div>
                <p className="modeIcon"><MdOutlineLightMode /></p>
                <p>Switch to lite mode </p> {/* i should make a cookie to remember the preference of user and write here dynamically */}
            </div>

            <ColorPicker /> {/* we should make this value a cookie or session */}
        </div>
     );
}
 
export default ChatSetting;