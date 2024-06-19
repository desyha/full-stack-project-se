import { useNavigate } from "react-router-dom";
import "./register.scss"
import { useState } from "react";
// import axios from "axios";
import apiRequest from "../../lib/apiRequest";

function Register(){

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmitReg = async (e) =>{
        e.preventDefault()
        setIsLoading(true)
        setError("")
        const formData = new FormData(e.target);
       
        const username = formData.get("username")
        const email = formData.get("email")
        const password = formData.get("password")
        const confirmpassword = formData.get("confirmpassword")
        const role = formData.get("role")

        try{
            if(password!==confirmpassword){
                setError("Password does not match")
            }else{
                const res = await apiRequest.post("/auth/register", {username, email, password, role})
                navigate("/login")
            }
        }catch(err){
            setError(err.response.data.message)
        }finally{
            setIsLoading(false)
        }
    };

    return(
        <div className="signup">
            <div className="image-container">
                <img src="/graphicsignup.png"/>
            </div>
            <div className="form-signup">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmitReg}>
                    <div>
                        <span><label>Username</label></span>
                        <span><input required minLength={4} name="username" type="text"></input></span>
                    </div>
                    <div>
                        <span><label>Email</label></span>
                        <span><input required minLength={4} name="email" type="email"></input></span>
                    </div>
                    <div>
                        <span><label>Password</label></span>
                        <span><input required minLength={6} name="password" type="password"></input></span>
                    </div>
                    <div>
                        <span><label>Confirm password</label></span>
                        <span><input required name="confirmpassword" type="password"></input></span>
                    </div>
                    <div>
                        <span><label>Daftar sebagai</label></span>
                        <span>
                        <select name="role" id="role">
                            <option value="user">Pengguna</option>
                            <option value="owner">Pemilik bengkel</option>
                        </select>
                        </span>
                    </div>
                    <div>{error && <span className="errorreg">{error}</span>}</div>
                    <button disabled={isLoading}>Daftar</button>
                </form>
                <div className="alternatif">
                    <div className="infoone">
                        <span>Sudah mempunyai akun? <a href="/login">Login!</a></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;