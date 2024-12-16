import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { sitios } from './sitiosData';
import L from 'leaflet';
import './Map.css'

const Map = () => {
    const customIcon = new L.Icon({
        iconUrl: '/images/localization.png',  // Ruta de la imagen del icono
        iconSize: [64, 64],  // Tamaño del icono
        iconAnchor: [16, 32],  // Punto de anclaje del icono en el marcador
        popupAnchor: [0, -32],  // Punto de anclaje del popup
    });


    return (
        <div>
            <h2>Mapa</h2>
            <div className="map-container">

                <MapContainer center={[40.416775, -3.703790]} zoom={15} className="react-leaflet-container">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {sitios.map(sitio => (
                        <Marker key={sitio.id} position={[sitio.localizacion.latitud, sitio.localizacion.longitud]} icon={customIcon}>
                            <Popup>
                                <div>
                                    <h2>{sitio.nombre}</h2>
                                    <img src={sitio.imagen} alt={sitio.nombre} style={{ width: '100px', height: 'auto' }} />

                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>

    );
};

export default Map;