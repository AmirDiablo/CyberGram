import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { useEditContext } from "../hooks/useEditContext";

const ActionsMenu = ({msgId}) => {
    const {dispatch} = useEditContext()
    
    const deleteMessage = async()=> {
        const response = await fetch("http://localhost:3000/api/message/delete/"+msgId)
        const json = await response.json()
    }

    const editMessage = async()=> {
        const elem = document.querySelector(".edit")
        elem.style.display = "flex"

        /* const elem2 = document.querySelector(".bottomChatPage")
        elem2.style.display = "none" */
    }
    
    return ( 
        <div className="actionsMenu">
            <div onClick={deleteMessage}>
                <BsTrash3 className="trashIcon" />
                <p>Delete</p>
            </div>
            <div onClick={editMessage}>
                <MdOutlineEdit className="editIcon" />
                <p>Edit</p>
            </div>
        </div>
     );
}
 
export default ActionsMenu;