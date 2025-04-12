import { Link } from "react-router-dom"
import logo from "../assets/profiles/logo2.png"
import { useLogin } from "../hooks/useLogin";
import { useState } from "react";



const Login = () => {
    const {login, error, isLoading} = useLogin()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e)=> {
        e.preventDefault()
        await login(username, email, password)
    }

    

    return ( 
        <div className="signup">
            {error && <div className="error">{error}</div>}
            <div>
                <img src={logo} className="logo" />
                <p className="nameOf">Cybergram</p>
                <p className="note">Please enter your informations to login</p>
            </div>
            <form>
                <input type="text" id="username" onChange={(e)=> setUsername(e.target.value)} value={username} />
                <label htmlFor="username" className="username">username</label>
                
                <input type="text" id="email" onChange={(e)=> setEmail(e.target.value)} value={email} />
                <label htmlFor="email" className="email">Email</label>

                <input type="text" id="password" onChange={(e)=> setPassword(e.target.value)} value={password} />
                <label htmlFor="password" className="password">password</label>
                <button onClick={handleSubmit} disabled={isLoading}>Login</button>
            </form>

            <p className="formQ">dont Have an account? <Link to="/signup" className="Link">Signup</Link></p>
        </div>
     );
}
 
export default Login;