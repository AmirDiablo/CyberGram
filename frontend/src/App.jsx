/* import Test from "./pages/test" */
import Nav from "./components/Nav"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ChatPage from "./pages/ChatPage"
import Setting from "./pages/Setting"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import ChatSetting from "./pages/ChatSetting"
import ProfileInfo from "./pages/ProfileInfo"
import Contacts from "./pages/Contacts"
import Devices from "./pages/Devices"
import SavedMessages from "./pages/SavedMessages"
import { useEffect } from "react"
import GapChatPage from "./pages/GapChatPage"
import NewGap from "./pages/NewGap"
import FinalGroup from "./pages/FinalGroup"
import AddMembers from "./pages/AddMembers"
import Edit from "./pages/Edit"
import Permissions from "./pages/Permissions"
import Support from "./pages/Support"
import Vote from "./components/Vote"
/* import Search from "./components/Search" */

function App() {
  const {user} = useAuthContext()

  let yourId;
  user ? yourId = JSON.parse(localStorage.getItem("user")).user._id : ""

 /*  useEffect(()=> {
    const handleBeforeUnload = (e)=> {
      fetch("http://localhost:3000/api/users/status", {
        method: "POST",
        body: JSON.stringify({id: yourId, status: isOnline}),
        headers: {
        "Content-Type" : "application/json"
        }
    })

      e.preventDefault()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return ()=> {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, []) */

  return (
    <div>
      <BrowserRouter>
        <div className="pages">
          <Nav />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Signup />}/>
            <Route path="signup" element={<Signup />}/>
            <Route path="login" element={<Login />}/>
            <Route path="chatpage" element={<ChatPage />}/>
            <Route path="setting" element={<Setting />}/>
            <Route path="chatSetting" element={<ChatSetting />}/>
            <Route path="profileInfo" element={<ProfileInfo />}/>
            <Route path="devices" element={<Devices />}/>
            <Route path="contacts" element={<Contacts />}/>
            <Route path="savedMessages" element={<SavedMessages />}/>
            <Route path="gapchatpage" element={<GapChatPage />}/>
            <Route path="newGroup" element={<NewGap />}/>
            <Route path="finalGroup" element={<FinalGroup />} />
            <Route path="addMembers" element={<AddMembers />} />
            <Route path="edit" element={<Edit />} />
            <Route path="permissions" element={<Permissions />} />
            <Route path="support" element={<Support />} />
            <Route path="vote" element={<Vote />} />
            {/* <Route path="search" element={<Search />}/> */}
            {/* <Route path="test" element={<Test />}/> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
