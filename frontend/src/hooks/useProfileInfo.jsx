import { useState } from "react"

export const useProfileInfo = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const myId = JSON.parse(localStorage.getItem("user")).user._id
    

    const profileInfo = async(username, bio, date)=> {
        const response = await fetch("http://localhost:3000/api/users/profileInfo", {
            method: "POST",
            body: JSON.stringify({myId, username, bio, date}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            setError(null)
        }
    }

    return {profileInfo, error, isLoading};
}