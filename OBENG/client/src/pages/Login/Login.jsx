import { useContext, useState } from "react";
import "./login.scss"
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login(){

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const {updateUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        const formData = new FormData(e.target);
        const email = formData.get("email")
        const password = formData.get("password")

        try{
            const res = await apiRequest.post("/auth/login", {email, password})
            updateUser(res.data)
            console.log(res)
           navigate("/")
        }catch(err){
            setError(err.response.data.message)
        }finally{
            setIsLoading(false)
        }
    };

    return(
        <div className="login">
            <div className="image-container">
                <img src="/graphiclogin.png"/>
            </div>
            <div className="form-login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <span><label>Email</label></span>
                        <span><input required name="email" type="text"></input></span>
                    </div>
                    <div>
                        <span><label>Password</label></span>
                        <span><input required name="password" type="password"></input></span>
                    </div>
                    {error && <span className="errorlog">{error}</span>}
                    <button disabled={isLoading}>Masuk</button>
                </form>
                <div className="alternatif">
                    <div className="infoone">
                        <span>Belum mempunyai akun? <a href="/register">Sign Up!</a></span>
                    </div>
                    <hr></hr>
                    <div className="infotwo">
                        <span>Atau dapat menggunakan cara alternatif</span>
                    </div>
                    <div className="tamu">
                        <span><a href="/">Masuk sebagai tamu</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;