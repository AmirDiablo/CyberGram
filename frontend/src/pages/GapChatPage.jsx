import TopChatPageGap from "../components/TopChatPageGap";
import GapActions from "../components/GapActions";
import GapMessages from "../components/GapMessages";
import BottomGapPage from "../components/BottomGapPage";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import GapInfo from "../components/GapInfo";

const GapChatPage = () => {
    const {state} = useLocation()
    const {chat} = state
    const [Theme, setTheme] = useState(null)
    const [me, setMe] = useState([])

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

    const myId = JSON.parse(localStorage.getItem("user")).user._id

    useEffect(()=> {
        fetch("http://localhost:3000/api/users/myInfo/"+myId)
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setMe(data)
        })
    }, [])

    useEffect(()=> {
        setTheme(getCookie("theme"))
    }, [])

    return ( 
        <div className="chatPageCon">
            <GapInfo chat={chat} myId={myId} />
            {me.map(m=> (
                <div className="chatPage" style={{backgroundImage: `url(${"../../public/wallpapers/"+m.wallpaper})`}}>
                    <GapActions myId={myId} chatId={chat._id}/>
                    <TopChatPageGap result={chat} />
                    <GapMessages chatId={chat._id} theme={Theme} />
                    <BottomGapPage chatId={chat._id} />

                </div>
            ))}
        </div>
     );
}
 
export default GapChatPage;