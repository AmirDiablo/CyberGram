import { BsTrash3 } from "react-icons/bs";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { GoSearch } from "react-icons/go";

const PvActions = ({myId, sec, chatId}) => {

    const addContacts = async()=> {
        const response = await fetch("http://localhost:3000/api/users/addContacts",{
            method: "POST",
            body: JSON.stringify({adder: myId, who: sec}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
    }

    const deleteChat = async()=> {
        window.location.reload()
        const response = await fetch("http://localhost:3000/api/chat/delete", {
            method: "POST",
            body: JSON.stringify({chatId}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()

    }

    const openSearchChat = ()=> {
        document.querySelector(".searchinchat").style.display = "flex"
        document.querySelector(".topChatPage").style.display = "none"
    }

    return ( 
        <div className="actions">
            <div><IoVolumeMuteOutline className="mute" /> <p>Mute</p></div>
            <div onClick={openSearchChat}><GoSearch className="zarebin" /> <p>Search</p></div>
            <div onClick={addContacts}><IoPersonAddOutline className="addContact" /> <p>Add to contacts</p></div>
            <div className="delete" onClick={deleteChat} ><BsTrash3 className="bin" style={{color: "red"}}/> <p style={{color: "red"}}>Delete chat</p></div>
        </div>
     );
}
 
export default PvActions;