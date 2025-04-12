import { useEffect, useState } from "react";
import supporter from "../assets/supporter3.png"
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Support = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)

    const close = ()=> {
        navigate(-1)
    }

    const myEmail = JSON.parse(localStorage.getItem("user")).user.email

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/api/users/support", {
            method: "POST",
            body: JSON.stringify({email: myEmail, message: text}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            console.log(json.msg)
            setMsg(json.msg)
        }
    }

    return ( 
        <div className="support">
            <div className="userProfileInfo">
                <IoArrowBack className="back" onClick={close} />
                <p style={{color: "white"}}>Support</p>
            </div>
            <img src={supporter} />
            <form onSubmit={handleSubmit}>
                <input className="supportInput" type="text" placeholder="Tell me your problem" onChange={(e)=> setText(e.target.value)} value={text}/>
                <button>Report issue</button>
            </form>

            {error ? error && <div className="supportError">{error}</div> : msg && <div className="msg">{msg}</div>}
        </div>
     );
}
 
export default Support;