import '../App.css';
import SitiosEmblematicos from '../components/SitiosEmblematicos';
import './Home.css';

import React from 'react';

import Map from '../components/Map';

const Home = () => {
    return (
        <div>
            <div className="intro">
                <h1>Descubre <span className="gradient-text">el mundo</span> como nunca antes lo has hecho</h1>
                <p>Descubre los lugares más emblemáticos de la capital de España.</p>
            </div>

            <div className="sitios">
                <h2>¡Colecciónalos todos!</h2>
            </div>

            <SitiosEmblematicos /> 
            <Map />
        </div>
    );
};

export default Home;