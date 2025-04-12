import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Edit = ({msgId}) => {
    const [edit, setEdit] = useState("")

    const handleEdit = async()=> {
        document.querySelector(".edit").style.display = "none"
        const response = await fetch("http://localhost:3000/api/message/edit", {
            method: "POST",
            body: JSON.stringify({text: edit, msgId}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
    }

    return ( 
        <div className="edit">
            <input type="text" className="messageInput" onChange={(e)=> setEdit(e.target.value)} value={edit} />
            <FaCheckCircle className="submitEdit" onClick={handleEdit}/>
        </div>
     );
}
 
export default Edit;