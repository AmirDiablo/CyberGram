import { Link } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { TbLogout } from "react-icons/tb";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import profile from "../../public/profile.png"
import { useEffect, useState } from "react";

const Nav = () => {
    const [me, setMe] = useState([])

    const close = ()=> {
        const menu = document.querySelector(".nav")
        menu.style.display = "none"
    }

    const expand = ()=> {
        const arrow = document.querySelector(".arrow")
        arrow.classList.toggle("arrow2")
    }

    const unExpand = ()=> {
        const arrow = document.querySelector(".arrow")
        arrow.classList.remove("arrow2")
    }

    const yourId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).user?._id : ""

    useEffect(()=> {
        fetch("http://localhost:3000/api/users/myInfo/"+yourId)   
        .then((response)=> {
            return response.json()
        })  
        .then((data)=> {
            setMe(data)
        })
    }, [])


    return ( 
        <ul className="nav">
            <RxCross1 className="cross" onClick={close}/>
            <MdOutlineKeyboardArrowDown className="arrow" onClick={expand} />
            {me.map((item)=> (
                <div>
                    <img src={"http://localhost:3000/uploads/profiles/"+item.profile} alt="profile" className="sideProfile" />
                    <p>{item.username}</p>
                    <p className="number">+98 9100406127</p>
                </div>
            ))}
            <li><IoSettingsOutline className="mark" /><Link className="link" to="setting">Settings</Link></li>
            <li><CiBookmark className="mark"/><Link className="link" to="savedMessages">Saved messages</Link></li>
            <li><IoPersonOutline className="mark" /><Link className="link" to="contacts">Contacts</Link></li>
            <li><BiSupport className="mark" /><Link className="link" to="support">Support</Link></li>
            <li><TbLogout className="mark" /><Link className="link">Logout</Link></li>
            <li><FaPersonCircleQuestion className="mark" /><Link className="link">About Us</Link></li>
        </ul>
     );
}
 
export default Nav;