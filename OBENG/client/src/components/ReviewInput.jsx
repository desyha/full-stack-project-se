import "./rate.css"
import "./reviewinput.scss"
import {useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest.js";

function ReviewInput({ bengkel }) {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const id = bengkel.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (rating) {
                const res = await apiRequest.post("/bengkel/" + id, {
                    postData: {
                        description: description,
                        rating: parseInt(rating),
                    },
                });
                setRating("");
                setDescription("");
                navigate("/" + id);
            } else {
                setError("Can't submit review");
            }
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="reviewinput">
            {currentUser ? (
                <form onSubmit={handleSubmit}>
                    <div className="rate">
                        <input
                            type="radio"
                            id="star5"
                            name="rate"
                            value="5"
                            checked={rating === "5"}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input
                            type="radio"
                            id="star4"
                            name="rate"
                            value="4"
                            checked={rating === "4"}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input
                            type="radio"
                            id="star3"
                            name="rate"
                            value="3"
                            checked={rating === "3"}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input
                            type="radio"
                            id="star2"
                            name="rate"
                            value="2"
                            checked={rating === "2"}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input
                            type="radio"
                            id="star1"
                            name="rate"
                            value="1"
                            checked={rating === "1"}
                            onChange={(e) => setRating(e.target.value)}
                        />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    <div>
                        <textarea
                            name="description"
                            placeholder="Tell us your experience in this workshop"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        {error && <span className="errorreg">{error}</span>}
                    </div><br />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            ) : (
                <span className="needaccount">Log in to leave a review</span>
            )}
        </div>
    );
}
  
  export default ReviewInput