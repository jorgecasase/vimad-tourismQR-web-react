import './HeaderFooter.css';

import React from 'react';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-columns'>
                <div className='footer-column'>
                    <h4>Quiénes Somos</h4>
                    <ul>
                        <li><a href='/'>Nuestra Historia</a></li>
                        <li><a href='/'>Misión</a></li>
                        <li><a href='/'>Equipo</a></li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <h4>Lugares Populares en Madrid</h4>
                    <ul>
                        <li><a href='/'>Museos</a></li>
                        <li><a href='/'>Parques</a></li>
                        <li><a href='/'>Restaurantes</a></li>
                    </ul>
                </div>
                <div className='footer-column'>
                    <h4>Contacto</h4>
                    <ul>
                        <li><a href='/'>Envíanos un Email</a></li>
                        <li><a href='/'>Ubicaciones</a></li>
                        <li><a href='/'>Carreras</a></li>
                    </ul>
                </div>
            </div>

            <p>&copy; 2024 ViMad. Todos los derechos reservados.</p>
        </footer>
    );
};

export default Footer;