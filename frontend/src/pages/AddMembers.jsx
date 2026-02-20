import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCheckmarkSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const AddMembers = () => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [newMembers, setNewMembers] = useState([])
    const {state} = useLocation()
    const {chat} = state

    const myId = JSON.parse(localStorage.getItem("user")).user._id

    useEffect(()=> {
        fetch("http://localhost:3000/api/users/myInfo/"+myId)
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setList(data)
        })
    }, [])

    const selectMembers = (id)=> {
        if(newMembers.includes(id) == false){
            setNewMembers([...newMembers, id])
        }
        if(newMembers.includes(id) == true){
            const newArr = newMembers.filter(item=> item !== id)
            console.log(newArr)
            setNewMembers(newArr)
        }
    }

    const AddToGap = async()=> {
        navigate(-1)
        const response = await fetch("http://localhost:3000/api/chat/addMember", {
            method: "POST",
            body: JSON.stringify({chatId: chat._id, newMembers}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
    }

    return ( 
        <div className="addMembers">
            <div className="PItop">
                <IoArrowBack className="back" onClick={close} />
                <p>Add Members</p>
            </div>

            <div className="Contacts">
                {list.map((item)=> (
                    <div className="Acontact">
                        {item.contacts.map((item2)=> (
                            <div className="info" onClick={()=> selectMembers(item2._id)}>
                                <img src={"http://localhost:3000/uploads/profiles/"+item2.profile} className="profilePhoto"/>
                                <div>
                                    <p>{item2.username}</p>
                                    <p className="status">last seen recently</p>
                                </div>
                                {newMembers.includes(item2._id) ? <div className="tick"><TiTick /></div> : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="nextStage" onClick={AddToGap}>
                <IoCheckmarkSharp className="tickIcon" />
            </div>
        </div>
     );
}
 
export default AddMembers;