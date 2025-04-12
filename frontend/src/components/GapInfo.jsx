import { IoArrowBack } from "react-icons/io5";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdOutlineEdit } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaRegCircle } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";
import { KOI8R } from "mysql/lib/protocol/constants/charsets";
import rectangle from "../assets/per.png"

import io from "socket.io-client"
const socket = io.connect("http://localhost:3000")

const GapInfo = ({chat, myId}) => {
    const navigate = useNavigate()
    const [votes, setVotes] = useState([])
    const [selection, setSelection] = useState([])
    const realRef = useRef([])
    const myRef = useRef([])
    const closeActions = ()=> {

    }

    const close = ()=> {
        const elem = document.querySelector(".gapInfoCon")
        elem.style.display = "none"
        const elem2 = document.querySelector(".chatPage")
        elem2.style.visibility = "visible"
    }

    const open = ()=> {
        const elem = document.querySelector(".profileActions")
        elem.style.display = "initial"
    }

    const moveToAddMembers = ()=> {
        if(chat.permissions.addUser === true || myId === chat.admin){
            navigate("/addMembers", {state: {chat: chat}})
        }else{
            console.log("no one can add Users anymore")
        }
    }

    const moveToEdit = ()=> {
        navigate("/edit", {state: {chat}})
    }

    const showVotes = ()=> {
        document.querySelector(".members").style.display = "none"
        document.querySelector(".votes").style.display = "flex"
    }

    const showMembers = ()=> {
        document.querySelector(".members").style.display = "flex"
        document.querySelector(".votes").style.display = "none"
    }

    useEffect(()=> {
        fetch("http://localhost:3000/api/vote/allVotes/"+chat._id)
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setVotes(data)
        })
    }, [])

    
    

    const moveToCreateVote = ()=> {
         navigate("/vote", {state: {chat}})
    }

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    const dropDown = ()=> {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.drop')) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
            }
          }
        }
      }


    const selectItem = (value, vote, isMultiple)=> {
        if(isMultiple){
            if(selection.includes(value) == false){
                setSelection([...selection, value])
            }
            if(selection.includes(value) == true){
                const newArr = selection.filter(item=> item !== value)
                setSelection(newArr)
            }
        }else{
            setSelection(value)
            
        }
    }


    const submitVote = async (vote)=> {
        const response = await fetch("http://localhost:3000/api/vote/submitVote", {
            method: "POST",
            body: JSON.stringify({voter: myId, vote, choice: selection}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
    }
    
    const result = (id, options)=> {
        /* socket.emit("percentage", {id, options})
        socket.on("percentage", (info)=> {
            myRef.current = info
            console.log("the info is ========> ",info)
        }) */
    
        fetch("http://localhost:3000/api/vote/result", {
            method: "POST",
            body: JSON.stringify({id, options}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            myRef.current = data
        })
        console.log(myRef.current)
    }


    return ( 
        <div className="gapInfoCon">
            <div className="userProfileInfo" onTouchStart={closeActions}>
                <IoArrowBack className="back" onClick={close} />
                <img src={"/profiles/"+chat.profile} className="profilePhotoGap"/>
                <div className="userStatus">
                    <p>{chat.name}</p>
                    <p className="status">{chat.members.length} members</p>
                </div>
                {myId === chat.admin ? <MdOutlineEdit className="editGapIcon" onClick={moveToEdit} /> : ""}
                <PiDotsThreeOutlineVerticalFill className="threeDots" onClick={open} />
            </div>

            <div className="infos">
                <p className="gapInfostext">Info</p>
                <p className="description">{chat.description}</p>
            </div>

            <div className="br"></div>

            <div className="addMember" onClick={moveToAddMembers}>
                <IoPersonAddOutline className="addmemberIcon"/>
                <p>Add Members</p>
            </div>

            <div className="br"></div>

            <div className="textList">
                <p className="membersText" onClick={showMembers}>Members</p>
                <div className="dropdown">
                    <p className="drop" onClick={dropDown} >Votes</p>
                    <div className="dropdown-content" id="myDropdown">
                        <p onClick={showVotes}>Gap Votes</p>
                        <p onClick={moveToCreateVote}>Create Vote</p>
                    </div>
                </div>
            </div>

            <div className="members">
                <div className="membersList">
                    {chat.members.map((member)=> (
                        <div className="member">
                            <img src={"/profiles/"+member.profile} className="profilePhoto" />
                            <div className="memberInfo">
                                <p className="membername">{member.username}</p>
                                <p className="status">last seen recently</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="votes">
                {votes.map((item)=> (
                    <div className="voteCon">
                        <p className="voteQuestion">{item.question}</p>
                        <p className="Poll">{item.isAnonymous ? "Anonymous Poll" : "Poll"}</p>

                        {item.options.map((opt)=> (
                            <div className="options" onClick={()=> selectItem(opt, item._id, item.isMultiple)}>
                                <div className="optionContent">
                                    {selection.includes(opt) ? <div className="tickOption"><IoCheckmarkCircle /></div> : <FaRegCircle className="circile" />}
                                    <p className="optionText">{opt}</p>
                                </div>
                                <div className="hr2"></div>
                            </div>
                        ))}

                        <p className="submitVote" onClick={()=> submitVote(item._id)}>Vote</p>
                        {result(item._id, [ item.options.map((i)=> i) ])}

                        {myRef.current.map((per)=> (
                            <div className="voteResult">
                                {
                                    <div className="displayResult">
                                        <p className="optionName">{per.option}: </p>
                                        <img src={rectangle} width={`${(per.percentage)}%`} className="perIcon" />
                                        <p>{per.percentage}% </p>
                                    </div>
                                }
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default GapInfo;