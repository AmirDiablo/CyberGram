import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RiGroupLine } from "react-icons/ri";
import { HiOutlineSpeakerphone } from "react-icons/hi";

const Contacts = () => {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    const myId = JSON.parse(localStorage.getItem("user")).user._id

    useEffect(()=> {
        fetch("http://localhost:3000/api/users/myInfo/"+myId)
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setList(data)
        })
    }, [])

    const close = ()=> {
        navigate(-1)
    }

    const openChat = (chat, chatId)=> {
        navigate("/chatpage", {state: {chat: chat, chatId: chatId}})
    }

    const handleClick = (type)=> {
        navigate("/"+type, {state: {info: list, myId}})
    }

    return ( 
        <div className="contacts">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p>Contatcs</p>
            </div>

            <div className="create">
                <div onClick={()=> handleClick("newGroup")}>
                    <RiGroupLine className="groupIcon"/>
                    <p>New Group</p>
                </div>
                <div onClick={()=> handleClick("newChannel")}>
                <HiOutlineSpeakerphone className="channelIcon"/>
                <p>New Channel</p>
                </div>
            </div>
            
            <div className="contactsList">
                {list.map((item)=> (
                    <div className="Acontact">
                        {item.contacts.map((item2)=> (
                            <div className="info" onClick={()=> openChat(item2, item._id)}>
                                <img src={"http://localhost:3000/uploads/profiles/"+item2.profile} className="profilePhoto"/>
                                <div>
                                    <p>{item2.username}</p>
                                    <p className="status">last seen recently</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default Contacts;