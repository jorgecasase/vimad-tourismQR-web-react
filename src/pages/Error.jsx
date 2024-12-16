import './Error.css';

import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <h1>¿Te has perdido?</h1>
            {/* Icono o algo */}
            <p>Sabemos que algunas calles de Madrid son un poco liosas.</p>
            <p>¡No te preocupes! ¡Aquí tienes un atajo!</p>
            <Link to="/">
                <button>Vuelve al punto de partida</button>
            </Link>
        </div>
    );
};

export default ErrorPage;