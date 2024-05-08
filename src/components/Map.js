import React from 'react'
import { MapContainer as LeafletMap, TileLayer, useMap, Marker, Popup ,Circle} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import NumberFormat from 'react-number-format';


let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeMapView({ coords }) {

    const map = useMap();
    map.setView([coords.lat, coords.lng], map.getZoom());

    return null;
}


function Map({ countries, center, zoom, data }) {
    let flagurl = "";
    if ("countryInfo" in data) {
        flagurl = data.countryInfo.flag
    }
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom} >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <ChangeMapView coords={center} />

                {countries.map((country) => (
                    
                    <Circle
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        color="red"
                        fillColor="{255,0,0}"
                        fillOpacity={0.5}
                        radius={(country.active)/2}></Circle>
                ))}

                <Marker position={center}>
                    <Popup className="popup">
                        {flagurl ? <img src={flagurl} alt="flag" width="100px" height="70px"></img> : ""}
                        <br></br>
                        <span className="phead">Country</span> : {flagurl ? data.country : "Worldwide"}
                        <br></br>
                        <span className="phead">Active Cases</span> : <NumberFormat value={data.active} thousandSeparator={true} disabled={true}></NumberFormat>
                        <br></br>
                        <span className="phead">Deaths</span> : <NumberFormat value={data.deaths} thousandSeparator={true} disabled={true}></NumberFormat>
                        <br></br>
                        <span className="phead">Recovered Cases</span> : <NumberFormat value={data.recovered} thousandSeparator={true} disabled={true}></NumberFormat>
                    </Popup>

                </Marker>
            </LeafletMap>
        </div>
    )
}

export default Map
