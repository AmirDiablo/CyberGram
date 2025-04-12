import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const SearchInChat = () => {
    const [search, setSearch] = useState('')
    const [counter, setCounter] = useState(0)
    const [result, setResult] = useState([])

    useEffect(()=> {
        const conatiner = document.querySelector(".chatMessage")

        function searchInDOM(node, searchText, positions) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.includes(searchText)) {
                    const rect = node.parentNode.getBoundingClientRect();
                    
                    positions.push({
                        text: node.textContent,
                        position: {
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height
                        }
                    });
                }
            } else {
                node.childNodes.forEach(child => searchInDOM(child, searchText, positions));
            }
        }
    
        const searchText = search;
        const positions = [];
        searchInDOM(conatiner, searchText, positions);
    
        console.log('موقعیت عناصر پیدا شده:', positions);

        setResult(positions)

    }, [search])

    const closeSearch = ()=> {
        document.querySelector(".searchinchat").style.display = "none"
        document.querySelector(".topChatPage").style.display = "flex"
    }

    const clearInput = ()=> {
        setSearch("")
        /* document.querySelector(".searchChatInput").value = "" */
    }

    const increase = ()=> {
        setCounter(counter+1)
        console.log(result)
        if(counter === 5){
            setCounter(0)
        }
    }

    const decrease = ()=> {
        setCounter(counter-1)
        if(counter === 0){
            setCounter(5)
        }
    }

    const up = ()=> {
        setCounter(counter+1)
        console.log(result[counter])
        if(counter === result.length-1){
            setCounter(0)
        }

        document.querySelector(".chatMessage").scrollTo(0, result[counter].position.top - result[counter].position.height - 20)
    }

    const down = ()=> {
        setCounter(counter-1)
        if(counter === 0){
            setCounter(result.length -1)
        }

        document.querySelector(".chatMessage").scrollTo(0, result[counter].position.top - result[counter].position.height - 20 )
        console.log(result[counter])
    }

    
    return ( 
        <div className="searchinchat">
            <IoArrowBack className="back" onClick={closeSearch} />
            <input type="text" className="searchChatInput" onChange={(e)=> setSearch(e.target.value)} value={search}/>
            <MdKeyboardArrowUp className="arrowUp" onClick={up}/>
            <MdKeyboardArrowDown className="arrowDown" onClick={down}/>
            {search === '' ? "" : <RxCross1 className="cross" onClick={clearInput} />}
            <div>{counter}</div>
        </div>
     );
}
 
export default SearchInChat;