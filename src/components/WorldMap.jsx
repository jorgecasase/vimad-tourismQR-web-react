import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Asegúrate de importar leaflet para crear el ícono personalizado
import './WorldMap.css';
import { sitios } from './sitiosData'; // Asegúrate de importar tus datos de sitios

// Personaliza el icono del marcador si lo necesitas
const customIcon = new L.Icon({
    iconUrl: '/images/localization.png',  // Ruta de la imagen del icono
    iconSize: [32, 32],  // Tamaño del icono
    iconAnchor: [16, 16],  // Centrado del icono (mitad del tamaño del icono)
    popupAnchor: [0, -16],  // El popup aparecerá justo encima del ícono
});
const favoritosId = JSON.parse(localStorage.getItem('favoritos')) || [];
const sitiosFavoritosData = sitios.filter((sitio) => favoritosId.includes(sitio.id));

const WorldMap = () => {
    return (
        <div>
            <div className="WorldMap-container">
                {/* Mapa centrado en el centro del mundo con un zoom para ver todo el mapa */}
                <MapContainer center={[40, 0]} zoom={2} className="react-leaflet-container" style={{ height: '500px', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Marcadores para los sitios */}
                    {sitiosFavoritosData.map((sitio) => (
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

export default WorldMap;