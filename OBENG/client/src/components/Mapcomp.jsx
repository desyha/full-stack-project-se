import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "./mapcomp.scss"
import "leaflet/dist/leaflet.css";
import { useLoaderData } from 'react-router-dom';

function Mapcomp({items}){
    const [one, two] = items.coordinate
    const position = [one, two]
    const bengkel = useLoaderData();
    return(
        <div>
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: 300 }} className='map'>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
            </Marker>
        </MapContainer>
        </div>
    )
}

export default Mapcomp