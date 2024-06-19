
import { useState } from "react";


function Filter(){
     const [query, setQuery] = useState({
    specialization: "Both"})
    const switchspecialization = (val) => {
        setQuery((prev) => ({ ...prev, specialization: val }));
      };
    
    return(
        <div className="filter"> 
            <div className="query-text">
                <h2>Hasil pencarian</h2>
            </div>
            <div className="dropdown">
                <label htmlFor="filter-drop"></label>
                <select name="specialization" id="specialization" onSelect={()=>switchspecialization(value)}>
                    <option value="motor">Motor</option>
                    <option value="mobil">Mobil</option>
                    <option value="both">Both</option>
                </select>
            </div>
        </div>
    )
}
export default Filter