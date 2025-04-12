import { Link } from "react-router-dom"
import logo from "../assets/profiles/logo2.png"
import { useSignup } from "../hooks/useSignup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const {signup, error, isLoading} = useSignup()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    

    const handleSubmit = async(e)=> {
        e.preventDefault()
        await signup(username, email, password)
        await navigate("/")
    }

    return ( 
        <div className="signup">
            {error && <div className="error">{error}</div>}
            <div>
                <img src={logo} className="logo" />
                <p className="nameOf">Cybergram</p>
                <p className="note">Please enter your username and password</p>
            </div>
            <form>
                <input type="text" id="username" onChange={(e)=> setUsername(e.target.value)} value={username} />
                <label htmlFor="username" className="username">username</label>

                <input type="text" id="email" onChange={(e)=> setEmail(e.target.value)} value={email} />
                <label htmlFor="email" className="email">Email</label>

                <input type="text" id="password" onChange={(e)=> setPassword(e.target.value)} value={password} />
                <label htmlFor="password" className="password">password</label>
                <button onClick={handleSubmit} disabled={isLoading}>Sign up</button>
            </form>

            <p className="formQ">Have an account? <Link to="/login" className="Link">Login</Link></p>
        </div>
     );
}
 
export default Signup;