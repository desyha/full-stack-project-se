import { Link } from "react-router-dom"
import "./review.scss"
import apiRequest from "../lib/apiRequest"
import { useEffect, useState } from "react";


function Review({item}){
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const fetchUser = async () => {
        try {
            const response = await apiRequest.get(`/users/search/${item.userId}`);
            setUser(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err);
        }
    };
    useEffect(() => {fetchUser();}, [item.userId]);
    return(
        <div className="reviews">
                <div className="imgcontainer">
                    <img src="iconUserProfilePicture.png"/>
                </div>
                <div className="textcontainer">
                        <h3 className="title">
                            {user ? (<span>{user.username}</span>)
                            :(<span>User does not exist</span>)}
                        </h3>
                        <p className="rating">
                            {Array.from({ length: item.rating }, (_, i) => i).map((i) => (
                            <img className="star" src={"/iconbintang.png"} alt="me" key={`rating-img-${i}`} />
                            ))}
                        </p>
                        <p className="description">
                            <span>{item.description}</span>
                        </p>
                </div>
        </div>
    )
}

export default Review