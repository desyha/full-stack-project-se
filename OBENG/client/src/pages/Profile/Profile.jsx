import { Suspense, useContext, useState } from "react"
import "./profile.scss"
import { AuthContext } from "../../context/AuthContext"
import apiRequest from "../../lib/apiRequest"
import { Await, Link, useLoaderData } from "react-router-dom"
import List from "../../components/List.jsx";


function Profile(){
    const data = useLoaderData();

    const {updateUser, currentUser} = useContext(AuthContext)
    const [error, setError] = useState("")
    
    const handleLogout = async()=>{
            try{
                await apiRequest.post("/auth/logout")
                updateUser(null)
                navigate("/")
            }catch(err){
                console.log(err)
            }
        }

    return(
        <div className="profiledetails">
           <div className="userinfo">
                <img src={"/iconUserProfilePicture.png"} className="profileimg"/>
                <div>
                    <h3>{currentUser.userInfo.username}</h3>
                    <span>{currentUser.userInfo.email || null}</span>
                    <div><span>{currentUser.userInfo.role || null}</span></div>
                </div>
           </div>
           <div> 
            <button className="logoutbutton" onClick={handleLogout}>Log out</button>
            </div>
           <div>
            {currentUser.userInfo.role=="owner" && (
                <div className="daftar">
                    <h3>Your workshops</h3>
                    <Link to="/createbengkel" className="createbengkel">Create</Link>
                   <div className="containerprofile">
                   <Suspense fallback={<p className="load">Loading...</p>}>
                        <Await
                        resolve={data.postResponse}
                        errorElement={<p className="load">Nothing here yet!</p>}
                        >
                        {(postResponse) => <List posts={postResponse.data.userBengkel} />}
                        </Await>
                    </Suspense>
                   </div>
                </div>)}
            </div>
            <div>
                <div className="saved">
                        <h3>Saved Workshops</h3>
                        <div className="containerprofile">
                        <Suspense fallback={<p className="load">Loading...</p>}>
                            <Await
                            resolve={data.postResponse}
                            errorElement={<p className="load">Nothing here yet!</p>}
                            >
                            {(postResponse) => <List posts={postResponse.data.savedBengkel} />}
                            </Await>
                        </Suspense>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Profile;