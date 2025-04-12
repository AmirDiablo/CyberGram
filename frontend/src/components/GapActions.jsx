import { MdReportGmailerrorred } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

const GapActions = ({myId, chatId}) => {

    const leaveGap = async()=> {
        const response = await fetch("http://localhost:3000/api/chat/leave", {
            method: "POST",
            body: JSON.stringify({userId: myId, chatId}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
    }

    return ( 
        <div className="actions">
            <div><IoVolumeMuteOutline className="mute" /> <p>Mute</p></div>
            <div><GoSearch className="zarebin" /> <p>Search</p></div>
            <div><MdReportGmailerrorred  className="addContact" /> <p>Report</p></div>
            <div className="leave" onClick={leaveGap}><TbLogout  className="leaveIcon" style={{color: "red"}}/> <p style={{color: "red"}}>Leave group</p></div>
        </div>
     );
}
 
export default GapActions;