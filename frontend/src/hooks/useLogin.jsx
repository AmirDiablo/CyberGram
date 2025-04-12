import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsloading] = useState(null)
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    const login = async(username, email ,password)=> {
        const response = await fetch("http://localhost:3000/api/users/login", {
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

    return {login, error, isLoading}; 
}
