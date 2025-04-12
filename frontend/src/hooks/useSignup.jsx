import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async(username, email ,password)=> {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            body: JSON.stringify({username, email, password}),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setIsloading(false)
        }
        if(response.ok){
            setError(null)

            localStorage.setItem("user", JSON.stringify(json))

            dispatch({type: "LOGIN", payload: json})

            navigate("/")
        }
    }   

    return {signup, error, isLoading}; 
}
