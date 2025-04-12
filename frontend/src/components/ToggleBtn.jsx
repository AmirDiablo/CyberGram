import { useState } from "react";

const ToggleBtn = ({item, changePermission, permission}) => {
    const [isChecked, setIsChecked] = useState(permission)

    const checkIt = ()=> {
        setIsChecked(!isChecked)
        console.log(item + ":" + isChecked)
        changePermission(item, isChecked)
    }

    return ( 
        <div className="toggle" >
            <label className="switch">
                <input type="checkbox" onClick={checkIt} checked={isChecked}  />
                <span className="slider round"></span>
            </label>
        </div>
     );
}
 
export default ToggleBtn;