import { Link } from "react-router-dom";
import "./cardhor.scss";

function CardHor({item}){
    return(
        <div className="cardhor">
            <Link to={`/${item.id}`} className="imageContainerhor">
                <img src={item.image}/>
            </Link>
            <div className="textContainerhor">
                <h3 className="titlehor">
                    <Link to={`/${item.id}`}>
                    {item.name}
                    </Link>
                </h3>
                {item.rating? (<p className="ratinghor">
                    <span>{item.rating.toLocaleString(undefined, {maximumFractionDigits:1})} / 5 </span>
                    <img src="/iconbintang.png"/>
                </p>):
                (<p>No ratings yet</p>)}
                <p className="address">
                    <span>{item.address}</span>
                </p>
                <p className="specializationhor">
                    <span>{item.specialization}</span>
                </p>
            </div>
        </div>
    )
}
export default CardHor