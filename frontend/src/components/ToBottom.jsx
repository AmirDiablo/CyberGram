import { IoIosArrowDown } from "react-icons/io";

const ToBottom = () => {

    const goToBottom = ()=> {
        const targetElem = document.querySelector(".chatMessage")
        targetElem.scrollTop = targetElem.scrollHeight;
    }

    return ( 
        <div className="tobottom" onClick={goToBottom}>
            <IoIosArrowDown className="arrowBottom" />
        </div>
     );
}
 
export default ToBottom;