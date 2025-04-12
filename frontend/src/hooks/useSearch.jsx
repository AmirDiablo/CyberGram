import { useState } from "react"

export const useSearch = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [result, setResult] = useState([])

    const search = async(chat)=> {
        const response = await fetch("http://localhost:3000/api/users/search/"+chat)
        const json = await response.json()
        
        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            setError(null)
            setResult(json)
        }
        
    }
    return {search, error, isLoading, result};
}