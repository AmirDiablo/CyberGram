import { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useUploadProfile } from "../hooks/useUploadProfile";

const AddProfile = () => {
    const [file, setFile] = useState()
    const {uploadProfile, error, isLoading} = useUploadProfile()

    return ( 
        <div className="addProfile">
            <MdOutlineAddAPhoto className="addIcon"/>
            <input type="file" name="file" id="file" onInput={(e)=> setFile(e.target.files[0])} onChange={()=> uploadProfile(file)} />
        </div>
     );
}
 
export default AddProfile;