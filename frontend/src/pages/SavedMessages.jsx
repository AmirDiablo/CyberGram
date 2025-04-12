import { useEffect, useState } from "react";

const SavedMessages = () => {
    const [me, setMe] = useState([])

    //now i can use localStorage data instead of fetching data
    const myId = 
    useEffect(()=> {
        fetch("http://localhost:3000/api/users/")
        .then((response)=> {
            return response.json()
        })
        .then((data)=> {
            setMe(data)
        })
    }, [])

    return ( 
        <div className="savedM">
            Hello
        </div>
     );
}
 
export default SavedMessages;