import { useState } from "react"
import axios from "axios"

export const useUploadProfile = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const uploadProfile = async (file)=> {
        const myId = JSON.parse(localStorage.getItem("user")).user._id
        const formData = new FormData()
        formData.append("file", file)
        axios.post("http://localhost:3000/api/users/profile/"+myId, formData)
        .then((res)=> {
            setError(false)
            return res.json()
        })
        .catch((err)=> {
        setError(true)
        })
        
    }

    return {uploadProfile, error, isLoading};
}
 
