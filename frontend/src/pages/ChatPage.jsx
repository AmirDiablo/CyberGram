import { useLocation } from "react-router-dom";
import TopChatPage from "../components/TopChatPage";
import BottomChatPage from "../components/BottomChatPage";
import ChatMessages from "../components/ChatMessages";
import PvActions from "../components/PvActions";
import { useEffect, useState } from "react";
import UserProfileInfo from "../components/UserProfileInfo";
import SearchInChat from "../components/SearchInChat";
import Edit from "../components/Edit";

import io from "socket.io-client"
const socket = io.connect("http://localhost:3000")


const ChatPage = () => {
    const {state} = useLocation()
    const {chat, chatId} = state
    const [me, setMe] = useState([])
    const [msgId ,setMsgId] = useState()
    const [Theme, setTheme] = useState(null)

    console.log("chatId is: ", chatId)

    if(useLocation().search === "?sign=H"){
        var sign = "home"
    }

    const myId = JSON.parse(localStorage.getItem("user")).user._id

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

    const changeFromChild = (id)=> {
        console.log("from child: ",id)
        setMsgId(id)

    }

    useEffect(()=> {
        setTheme(getCookie("theme"))

        fetch("http://localhost:3000/api/users/myInfo/"+myId)
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setMe(data)
        })
    }, [])


    return ( 
        <div className="chatPageCon">
            <UserProfileInfo result={chat} myId={myId}/>
            {me.map((m)=> (
                <div className="chatPage" style={{backgroundImage: `url(${"../../public/wallpapers/"+m.wallpaper})`}}>
                    <TopChatPage result={chat} location={sign ? sign : "S"} />
                    <SearchInChat />
                    <PvActions myId={myId} sec={chat} chatId={chatId}/>
                    <ChatMessages result={chat} chatId={chatId} changeFromChild={changeFromChild} theme={Theme} />
                    <BottomChatPage result={chat} chatId={chatId} socketId={socket.id} />
                    <Edit msgId={msgId} />
                </div>
            ))}
            
        </div>
     );
}
 
export default ChatPage;