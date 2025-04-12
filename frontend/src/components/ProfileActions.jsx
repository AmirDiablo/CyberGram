import { MdBlock } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import { IoPersonAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const ProfileActions = ({result}) => {
    const [me, setMe] = useState([])

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

    const deleteContact = async()=> {
        const response = await fetch("http://localhost:3000/api/users/deleteContact", {
            method: "POST",
            body: JSON.stringify({me: myId, who: result._id}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
    }

    return ( 
        <div className="profileActions">
            <div><MdBlock className="block" /> <p>Block User</p></div>
            <div><MdOutlineEdit className="editContacts"/> <p>Edit contacts</p></div>
            {me.map((item)=> (
                <div>
                    {item.contacts.includes(result) === false ? 
                    <div><IoPersonAddOutline className="addContact" /> <p>Add to contacts</p></div>  : 
                    <div className="delete" onClick={deleteContact}><BsTrash3 className="bin" style={{color: "red"}}/> <p style={{color: "red"}}>Delete contact</p></div>
                    }
                </div>
            ))}
        </div>
     );
}
 
export default ProfileActions;