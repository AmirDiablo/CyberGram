import { useState } from "react"

export const useFetchChats = () => {
    const [error, setError] = useState(null)
    const [result, setResult] = useState([])
    const id = JSON.parse(localStorage.getItem("user")).user._id

    const fetchChats = async ()=> {
        const response = await fetch("http://localhost:3000/api/chat/"+id)  //fetch chat that my name is in its member field
        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setResult(json)
        }
    }
    return {fetchChats, error, result};
}
