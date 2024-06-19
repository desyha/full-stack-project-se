import "./bengkel.scss"
import DisplayArray from "../../components/Services";
import Mapcomp from "../../components/Mapcomp";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Review from "../../components/Review.jsx";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import ReviewInput from "../../components/ReviewInput.jsx";

function Bengkel(){
    const {updateUser, currentUser} = useContext(AuthContext)
    const bengkel = useLoaderData();
    const navigate = useNavigate()
    const [saved, setSaved] = useState(bengkel.isSaved);
    const review = bengkel.review

    const handleSave = async () => {
        if (!currentUser) {
          navigate("/login");
        }
        setSaved((prev) => !prev);
        try {
          await apiRequest.post("/users/save", { bengkelId: bengkel.id });
        } catch (err) {
          console.log(err);
          setSaved((prev) => !prev);
        }
      };

    return(
        <div className="bengkel">
            <div>
                <div className="image-containter"> 
                    <img src={bengkel.image || "./placeholderimage.png"}/>
                </div>
                <div className="info">
                    <div className="save">
                        <h2>{bengkel.name}</h2> 
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: saved ? "#f59e3c" : "white",}}
                        >
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                    </div>
                    <div>
                        {bengkel.rating? (
                            <p className="rating">
                                <span>{bengkel.rating.toLocaleString(undefined, {maximumFractionDigits:1})} / 5 </span>
                                <img src="/iconbintang.png"/>
                            </p>
                        ):(<p>No rating yet</p>)}
                    </div>
                    <div  className="desc">
                        <span>
                            {bengkel.description}
                        </span>
                    </div>
                </div>
                <div className="services"> 
                    <h3>Services</h3>
                    <div className="allservices">
                        <DisplayArray/>
                    </div>
                </div>
                <h3>Address</h3>
                <div className="address"> 
                    <div className="map">
                        <Mapcomp items={bengkel}/>
                    </div>
                    <div className="addressdetail">
                        <img src="/iconMapMarker.png"/>
                        <div className="link">
                            <Link to={`http://maps.google.com/?q=${bengkel.address}`}>{bengkel.address}</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review"> 
                <h3 className="titlereview">Review</h3>
                <div>
                    <ReviewInput bengkel={bengkel}/>
                </div>
                <div>
                {review ? (<div>
                    {review.map(item=>(
                        <Review key={item.id} item={item}/>
                    ))}
                    </div>) : 
                    (<span className="noreview">No reviews yet</span>)}
                </div>
            </div>
        </div>
    )
}

export default Bengkel;