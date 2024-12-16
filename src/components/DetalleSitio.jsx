import './DetalleSitio.css';
import 'leaflet/dist/leaflet.css';

import React, { useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import QRGenerator from './QRGenerator';
import useWikipedia from './useWikipedia';
import { sitios } from './sitiosData';

import actividadesJSON from '../actividades.json';

const DetallesSitio = () => {
    const { id } = useParams();
    const sitio = sitios.find(s => s.id === parseInt(id));
    const { nombre, descripcion, imagen, localizacion } = sitio || {};
    const { data, loading, error} = useWikipedia(nombre);

    useEffect(() => {
        const fetchComentarios = async () => {
            const actividad = actividadesJSON[id];
            if (actividad) {
            }
        };
    
        fetchComentarios();
    }, [id]);
    

    if (!sitio) {
        return <p>El sitio no se encuentra</p>;
    }

    const customIcon = new L.Icon({
        iconUrl: '/images/localization.png',
        iconSize: [64, 64],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const sitioEmblematico = actividadesJSON.sitiosEmblematicos
            ? actividadesJSON.sitiosEmblematicos.find(se => se.id === parseInt(id))
            : null;

    const actividades = sitioEmblematico ? sitioEmblematico.actividades : [];


    return (
        <div className="detalles-sitio">
            <div
                className="title"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagen})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                }}
            >
                <div className="comentario-emblematico">
                    <h1>{sitioEmblematico?.comentario || 'No hay comentario emblemático'}</h1>
                </div>
            </div>

            <div>
                <h2 className='subtitulo'>¿Qué puedo hacer allí?</h2>
            </div>

            <div className="contenedor-grid">
                {actividades.map((actividad, index) => (
                    <div key={index} className="elemento-item">
                    <h3>{actividad.nombre}</h3>
                    {actividad.detalles && actividad.detalles.length > 0 ? (
                        <ul>
                        {actividad.detalles.map((detalle, detalleIndex) => (
                            <li key={detalleIndex}>
                            <strong>{detalle.nombre}</strong>: {detalle.descripcion}
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <p>No hay detalles disponibles</p>
                    )}
                    </div>
                ))}
            </div>


            <div>
                <h2 className='subtitulo'>Consejos</h2>
            </div>

            <div className="contenedor-grid">
                {sitioEmblematico?.consejos && sitioEmblematico.consejos.length > 0 ? (
                    sitioEmblematico.consejos.map((consejo, index) => {
                        // Dividir el texto en partes usando ":" como separador
                        const partes = consejo.split(':');

                        return (
                            <div key={index} className="elemento-item">
                                <p>
                                    <span className="consejo-subtitulo">{partes[0]}:</span> {/* Parte antes del ":" */}
                                    <span> {partes[1]?.trim() || ""}</span> {/* Parte después del ":" */}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay consejos disponibles</p>
                )}
            </div>



            <div>
                <h2 className='subtitulo'>Un poco de historia</h2>
            </div>
            
            <div className="descripcion">
                {loading && <p>Cargando...</p>}
                {error && <p>Aún no tenemos información sobre este monumento</p>}
                {data ? (
                    <div dangerouslySetInnerHTML={{ __html: data }} className="texto" />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: descripcion }} className="texto" />
                )}
            </div>

            <div>
                <h2 className='subtitulo'>Localización</h2>
            </div>

            <div className="map-wrapper">
                <MapContainer
                    center={[localizacion.latitud, localizacion.longitud]}
                    zoom={16}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[localizacion.latitud, localizacion.longitud]} icon={customIcon}>
                        <Popup>{data ? data.title : nombre}</Popup>
                    </Marker>
                </MapContainer>
            </div>
            <QRGenerator id={id} />
            
        </div>
    );
};

export default DetallesSitio;
