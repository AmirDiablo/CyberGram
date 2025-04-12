import { SlMenu } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";

const Header = () => {

    const openMenu = ()=> {
        const menu = document.querySelector(".nav")
        menu.style.display = "flex"
    }

    const openSearch = ()=> {
        const elem = document.querySelector(".header")
        elem.style.display = "none"

        const elem2 = document.querySelector(".searchPage")
        elem2.style.display = "initial"

        //removing chat list later
        const elem3 = document.querySelector(".chatList")
        elem3.style.display = "none"
    }

    return ( 
        <div className="header">
            <SlMenu className="hamburg" onClick={openMenu} />
            <p className="programName">Cybergram</p>
            <IoSearch className="search" onClick={openSearch}/>
        </div>
     );
}
 
export default Header;