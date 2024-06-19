import { Link } from "react-router-dom";
import "./card.scss";

function Card({item}){
    const MAX_ITEMS_TO_DISPLAY = 3

    return(
        <div className="card">
            <Link to={`/${item.id}`} className="imageContainer">
                <img src={item.image}/>
            </Link>
            <div className="textContainer">
                <h3 className="title">
                    <Link to={`/${item.id}`}>
                    {item.name}
                    </Link>
                </h3>
                {item.rating? (<p className="rating">
                    <span>{item.rating.toLocaleString(undefined, {maximumFractionDigits:1})} / 5 </span>
                    <img src="/iconbintang.png"/>
                </p>):
                (<p>No ratings yet</p>)}
                <p className="address">
                    <span>{item.address}</span>
                </p>
                <p className="specialization">
                    <span>{item.specialization}</span>
                </p>
                <p className="service">
                    {item.services.slice(0, MAX_ITEMS_TO_DISPLAY).map((element, index) => (
                        <span key={index}>{element} | </span>
                    ))}
                    {item.services.length > MAX_ITEMS_TO_DISPLAY && <span>...</span>}
                </p>
            </div>
        </div>
    )
}
export default Card