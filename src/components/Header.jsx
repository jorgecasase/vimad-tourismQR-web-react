import './HeaderFooter.css';
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src="/images/ViMad_v2.png" alt="ViMad" className="logo" />
            </Link>
            <nav className="nav-links">
                <Link to="/">Inicio</Link>
                <Link to="/about">Sobre nosotros</Link>
            </nav>
            <Link to="/profile" className="profile-link">
                <img
                    src="/images/profile.png" 
                    alt="Perfil"
                    className="profile-circle"
                />
            </Link>
        </header>
    );
};

export default Header;