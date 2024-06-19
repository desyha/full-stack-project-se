import { useState } from "react"
import UploadWidget from "../../components/UploadWidget"
import "./createbengkel.scss"
import apiRequest from "../../lib/apiRequest"
import { useNavigate } from "react-router-dom"

function CreateBengkel(){
    const [error, setError] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const inputs = Object.fromEntries(formData);
        console.log(inputs)

        try{
            const res = await apiRequest.post("/bengkel", {
            postData:{
                name : inputs.name,
                address: inputs.address,
                rating: null,
                services: inputs.services.split(","),
                specialization: inputs.specialization,
                description: inputs.description,
                image: image,
                coordinate: [parseFloat(inputs.latitude), parseFloat(inputs.longitude)],
            }
        })
            navigate("/"+res.data.id)
        }catch(err){
            console.log(err);
            setError(err);
        }
    }
    return(
        <div className="form-create">
            <div className="upimg">
                    <img src={image || "./placeholderimage.png"}/><br></br>
                    <UploadWidget uwConfig={{
                        cloudName:"dfsd82fhy",
                        uploadPreset: "obengimg",
                        multiple: false,
                        folder: "bengkel"
                    }}
                    setState={setImage}
                    />
                </div>
            <form onSubmit={handleSubmit}>
            <h2>Create a workshop</h2>
                <div>
                    <span><label>Name:</label></span>
                    <span><input required name="name" type="text"/></span>
                </div>
                <div>
                    <span><label>Description:</label></span><br></br>
                    <textarea rows={7} name="description"></textarea>
                </div>
                <div>
                    <span><label>Services:</label></span>
                    <div>
                    <span className="infoinput">Separate your services with a coma</span><br/>
                    <span className="infoinput">Example: Engine diagnostic,Battery replacement,Oil change</span>
                    </div>
                    <span><input required name="services" type="text"/></span>
                </div>
                <div>
                    <span><label>Specialization</label></span><br/>
                    <span>
                        <select name="specialization" id="specialization">
                            <option value="Both">Both</option>
                            <option value="Mobil">Mobil</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </span>
                </div>
                <div>
                    <span><label>Address:</label></span>
                    <span><input required name="address" type="text"/></span>
                </div>
                <div>
                    <span><label>Coordinates:</label></span>
                    <div className="coordinate">
                    <span><input required name="latitude" type="text" placeholder="latitude"/></span>
                    <span><input required name="longitude" type="text" placeholder="longitude"/></span>
                    </div>
                </div>
                <div>{error && <span className="errcreate">error</span>}</div>
                <div>
                    <button>Submit</button>
                </div>
                
            </form>
            
        </div>
    
    )
    
}

export default CreateBengkel