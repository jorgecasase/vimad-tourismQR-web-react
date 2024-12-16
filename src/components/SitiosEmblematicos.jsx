import React, { useState, useEffect } from 'react';
import './SitiosEmblematicos.css';
import { Link } from 'react-router-dom';
import { sitios } from './sitiosData';
import FilterButton from './FilterButton';

function SitiosEmblematicos(){
    const [favoritos, setFavoritos] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [filteredData, setFilteredData] = useState(sitios);

    // Cargar favoritos del localStorage al montar el componente
    useEffect(() => {
        const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
        setFavoritos(favoritosGuardados);
    }, []);

    // Manejar el like
    function handleLike(id){
        let nuevosFavoritos;
        if (favoritos.includes(id)) {
            // Si ya está en favoritos, se elimina
            nuevosFavoritos = favoritos.filter((fav) => fav !== id);
        } else {
            // Si no está en favoritos, se añade
            nuevosFavoritos = [...favoritos, id];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };

    function handleFilterToggle(isSelected, filter){
        // Actualiza los filtros activos
        const newActiveFilters = activeFilters.includes(filter)
            ? activeFilters.filter((f) => f !== filter) // Elimina si ya está activo
            : [...activeFilters, filter]; // Agrega si no está activo

        setActiveFilters(newActiveFilters);

        // Filtra los datos basados en los filtros activos
        if (newActiveFilters.length === 0) {
            setFilteredData(sitios); // Si no hay filtros, muestra todo
        } else {
            setFilteredData(
                sitios.filter((item) =>
                    item.filtro.some((tag) => newActiveFilters.includes(tag))
                )
            );
        }
    };

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <FilterButton
                    label="Palacios"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Palacios")}
                />
                <FilterButton
                    label="Museos"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Museos")}
                />
                <FilterButton
                    label="Al aire libre"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Al aire libre")}
                />
                <FilterButton
                    label="Naturaleza"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Naturaleza")}
                />
                <FilterButton
                    label="Monumentos"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Monumentos")}
                />
                <FilterButton
                    label="Religión"
                    onToggle={(isSelected) => handleFilterToggle(isSelected, "Religión")}
                />
            </div>
            <div className="sitios-grid">
                {filteredData.map((sitio) => (
                    <div key={sitio.id} className="tarjeta">
                        <Link to={`/sitio/${sitio.id}`} className="tarjeta-link">
                            <img src={sitio.imagen} alt={sitio.nombre} className="tarjeta-imagen" />
                            <div className="tarjeta-contenido">
                                <h3>{sitio.nombre.replace(/_/g, ' ')}</h3>
                                <p>{sitio.descripcion}</p>
                            </div>
                        </Link>
                        <button
                            className={`like-button ${favoritos.includes(sitio.id) ? 'liked' : ''}`}
                            onClick={() => handleLike(sitio.id)}
                        >
                            {favoritos.includes(sitio.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SitiosEmblematicos;