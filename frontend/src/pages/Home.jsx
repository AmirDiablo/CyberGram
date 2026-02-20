import Header from "../components/Header";
import Search from "../components/Search";
import { useFetchChats } from "../hooks/useFetchChats";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Create from "../components/Create";

import io from "socket.io-client"
const socket = io.connect("http://localhost:3000")

const Home = () => {
    const { fetchChats, error, result } = useFetchChats()
    const [me, setMe] = useState()
    const navigate = useNavigate()
   /*  const [me, setMe] = useState([]) */

    const yourname = JSON.parse(localStorage.getItem("user")).user.username
    const yourId = JSON.parse(localStorage.getItem("user")).user._id
    
    useEffect(()=> {
        fetchChats() //it should  be compeleted  
    }, [])

    const openChat = (chat, chatId)=> {
        navigate("/chatpage?sign=H", {state: {chat: chat, chatId: chatId}})
    }

    const openChatGap = (chat)=> {
        navigate("/gapchatpage", {state: {chat}})
    }


    return ( 
        <div>
            <Header />
            <Search/>
            <div className="chatList">
                {result.map((item)=> (
                <div>
                    {item.type === "pv" ? 
                        <div>
                            {item.members.map((i)=> (
                                <div>
                                    {i.username === yourname ? "" : 
                                        <div className="info" onClick={()=> openChat(i, item._id)}>
                                            <img src={i.profile === "profile.png" ? i.profile : "http://localhost:3000/uploads/profiles/"+ i.profile} className="profilePhoto" />
                                            <div>
                                                <p className="Sname">{i.username}</p>
                                                <p className="status">last seen recently</p>
                                            </div>
                                        </div>}
                                    
                                </div>
                            ))}
                        </div> : 
                    <div className="gapCon" onClick={()=> openChatGap(item)}>
                        <img src={"http://localhost:3000/uploads/profiles/"+item.profile} className="profilePhotoGap" />
                        <div>
                            <p className="Sname">{item.name}</p>
                            <p className="status">Hello everyone</p>
                        </div>
                    </div>
                }
                </div>
            ))}
            </div>
            <Create />
        </div>
     );
}
 
export default Home;
