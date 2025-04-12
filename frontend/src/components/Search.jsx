import { IoArrowBack } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useSearch } from "../hooks/useSearch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {
    const {search, error, isLoading, result} = useSearch()
    const [chat, setChat] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        await search(chat)
    }
    
    const close = ()=> {
        const elem = document.querySelector(".searchPage")
        elem.style.display = "none"

        const elem2 = document.querySelector(".header")
        elem2.style.display = "flex"

        const elem3 = document.querySelector(".chatList")
        elem3.style.display = "initial"
    }

    const openChat = ()=> {
        navigate("/chatpage", {state: {chat: result}})
    }

    return ( 
        <div className="searchPage">
            <form className="top" onSubmit={handleSubmit}>
                <IoArrowBack className="back" onClick={close} />
                <input type="search" placeholder="Search" onChange={(e)=> setChat(e.target.value)} value={chat} />
            </form>

            <div className="info" onClick={openChat}>
                <img src={result.profile} className="profilePhoto"/>
                <div>
                    <p className="Sname">{result.username}</p>
                    <p className="status">last seen recently</p>
                </div>
            </div>

            {error && <div className="Serror">{error}</div>}
        </div>
     );
}
 
export default Search;