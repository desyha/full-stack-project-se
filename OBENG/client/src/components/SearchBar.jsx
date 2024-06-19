import { useState } from "react";
import "./search.scss"
import { Link } from "react-router-dom";

function SearchBar(){
    const [query, setQuery] = useState({
        search: ""
    })

    const handleChange = e => {
        setQuery(() => ({[e.target.name]: e.target.value}))
    } 
    return(
        <form>
            <input type="text" name="search" placeholder="Search something here" onChange={handleChange}></input>
            <Link to={`/list?search=${query.search}`}>
            <button>
                <img src="/iconSearch.png"></img>
            </button>
            </Link>
        </form>
    )
}

export default SearchBar;