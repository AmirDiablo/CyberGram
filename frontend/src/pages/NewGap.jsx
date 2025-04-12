import { useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const NewGap = () => {
    const {state} = useLocation()
    const {info, myId} = state
    const navigate = useNavigate()
    
    const [list, setList] = useState([myId])

    const selectMember = (id)=> {
        if(list.includes(id) == false){
            setList([...list, id])
        }
        if(list.includes(id) == true){
            const indexOfDup = list.indexOf(id)
            console.log(indexOfDup)
            const newArr = list.filter(item=> item !== id)
            console.log(newArr)
            setList(newArr)
        }
    }

    console.log(list)

    const moveTo = ()=> {
        navigate("/finalGroup", {state: {list: list, myId}})
    }

    console.log(list)

    const close = ()=> {
        navigate(-1)
    }


    return ( 
        <div className="newgap">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p>New Group</p>
            </div>

            <div className="addMsg"> 
                who would you like to add ?
            </div>

            <div className="contactsList">
                {info.map((item)=> (
                    <div className="Acontact">
                        {item.contacts.map((item2)=> (
                            <div className="info" onClick={()=> selectMember(item2._id)}>
                                <img src={"/profiles/"+item2.profile} className="profilePhoto"/>
                                <div>
                                    <p>{item2.username}</p>
                                    <p className="status">last seen recently</p>
                                </div>
                                {list.includes(item2._id) ? <div className="tick"><TiTick /></div> : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
                
            <div className="nextStage">
                <FaArrowRightLong className="nextIcon" onClick={moveTo} />
            </div>
        </div>
     );
}
 
export default NewGap;