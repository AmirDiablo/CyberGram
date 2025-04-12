import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineBars4 } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";
import { AiFillPlusCircle } from "react-icons/ai";
import ToggleBtn from "./ToggleBtn"
import { useState } from "react";

const Vote = () => {
    const {state} = useLocation()
    const {chat} = state
    const [question, setQuestion] = useState("")
    const [list, setList] = useState([])
    const [item, setItem] = useState("")
    const [Anonymous, setAnonymous] = useState(true)
    const [Multiple, setMultiple] = useState(false)
    const [quiz, setQuiz] = useState(false)
    const navigate = useNavigate()

    const myId = JSON.parse(localStorage.getItem("user")).user._id

    //i should make a pop up component not a page. i change it later
    const close = ()=> {
        navigate(-1)
    }

    const create = async()=> {
        const response = await fetch("http://localhost:3000/api/vote/create", {
            method: "POST",
            body: JSON.stringify({creator: myId, options: list, chat: chat._id, question: question, isQuiz: quiz, isMultiple: Multiple, isAnonymous: Anonymous}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
    }

    const addToList = ()=> {
        setList([...list, item])
        setItem("")
    }

    const deleteOption = (value)=> {
        const newArr = list.filter(x=> x !== value)
        setList(newArr)
    }

    const changePermission = (name, value)=> {
            if(name==="Anonymous"){
                setAnonymous(!value)
            }
            if(name==="MultipleAnswes"){
                setMultiple(!value)
            }
            if(name==="quiz"){
                setQuiz(!value)
            }
    }

    return ( 
        <div className="vote">
            <div className="userProfileInfo">
                <IoArrowBack className="back" onClick={close} />
                <p style={{color: "white"}}>New Poll</p>
                <p className="CREATE" onClick={create}>CREATE</p>
            </div>

            <div className="questionDIV">
                <p>Poll question</p>
                <input type="text" placeholder="Ask a question" className="pollQuestion" onChange={(e)=> setQuestion(e.target.value)} value={question} />
            </div>

            <div className="br"></div>

            <div className="answersDIV">
                <p>Answer options</p>

                {list.map((option)=> (
                    <div className="optionPart">
                        <HiOutlineBars4 className="fourLines" />
                        <input type="text" className="optionInput" placeholder="Option" onChange={(e)=> setItem(e.target.value)} value={option} />
                        <RxCross1 className="optionCross" onClick={()=> deleteOption(option)} />
                    </div>
                ))}

                <div className="optionPart">
                    <HiOutlineBars4 className="fourLines" />
                    <input type="text" className="optionInput" placeholder="Option" onChange={(e)=> setItem(e.target.value)} value={item} />
                    <RxCross1 className="optionCross" onClick={()=> deleteOption(item)} />
                </div>

                <div className="hr"></div>
                    
                <div className="addOptionPart">
                    <AiFillPlusCircle className="AddOptionIcon"/>
                    <p onClick={addToList}>Add an Option...</p>
                </div>
            </div>

            <div className="optionLimit">
                You can add 9 more options
            </div>

            <div className="pollSetting">
                <p>Settings</p>

                <div>
                    <p>Anonymoius Voting</p>
                    <ToggleBtn item={"Anonymous"} changePermission={changePermission} permission={Anonymous} />
                </div>

                <div>
                    <p>Multiple Answers</p>
                    <ToggleBtn item={"MultipleAnswes"} changePermission={changePermission} permission={Multiple} />
                </div>

                <div>
                    <p>Quiz Mode</p>
                    <ToggleBtn item={"quiz"} changePermission={changePermission} permission={quiz} />
                </div>
            
            </div>
        </div>
     );
}
 
export default Vote;