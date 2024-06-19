import { Link} from "react-router-dom";
import SearchBar from "./SearchBar";
import "./header.scss"
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Header(){
    const {updateUser, currentUser} = useContext(AuthContext)
    
    return(
        <nav>
            <div className="left">
                <Link to="/" className="logo">
                    <img src="/logoObeng.png"></img>
                </Link>
            </div>
            <div className="middle">
                <SearchBar/>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="profile">
                        <div>
                            <Link to={"/Profile"}>
                            <img src={"/iconUserProfilePicture.png"}/></Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="logbtn">
                            Login
                        </Link>
                    </div>
                )}
                
            </div>
        </nav>
    )
}

export default Header;