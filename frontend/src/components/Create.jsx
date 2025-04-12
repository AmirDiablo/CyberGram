import { MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Create = ({yourid}) => {
    const navigate = useNavigate()

    const moveTo = ()=> {
        navigate("/contacts")
    }

    return ( 
        <div className="Create" onClick={moveTo}>
            <MdOutlineEdit className="createIcon" />
        </div>
     );
}
 
export default Create;