import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik'; // Asegúrate de importar useFormik
import { sitios } from '../components/sitiosData'; // Importamos los sitios desde el archivo sitiosData
import * as Yup from 'yup'; // Importa Yup
import { Link } from 'react-router-dom'; // Importa Link
import './Profile.css'; // Importa el archivo CSS
import WorldMap from '../components/WorldMap';

const Profile = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string()
        .email('Introduce un correo válido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    }),
    onSubmit: (values) => {
      localStorage.setItem('user', JSON.stringify({ name: values.name, email: values.email }));
      localStorage.setItem('favorites', JSON.stringify([])); // Inicializa los favoritos
      setIsRegistered(true);
    },
  });

  // Verifica si ya hay un usuario registrado en localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsRegistered(true);
    }

    // Obtener los favoritos de localStorage y parsearlos

    const storedFavorites = JSON.parse(localStorage.getItem('favoritos')) || [];
    setFavoritos(storedFavorites);
    console.log("sotred", storedFavorites);
  }, []);

  const handleLike = (id) => {
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

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('favorites'); // Limpiar los favoritos también
    setIsRegistered(false); // Cambiar el estado para volver al formulario
  };

  // Si el usuario ya está registrado, mostrar un mensaje de bienvenida y botón de cerrar sesión
  if (isRegistered) {
    const user = JSON.parse(localStorage.getItem('user'));

    // Filtrar los sitios favoritos
    const favoritosSitios = sitios.filter((sitio) => favoritos.includes(sitio.id));

    return (
      <div>

        <div className="welcome-container">
          <h1 className="welcome-title">Bienvenido a tu <span className="gradient-text">colección</span>, {user.name}!</h1>
        </div>
        <div className="sitios-grid">
          {favoritosSitios.map((sitio) => (
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
        <WorldMap className = "MapaMundi"></WorldMap>
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button>
      </div>

    );
  }

  // Si no está registrado, mostrar el formulario de registro
  return (
    <div className="profile-container">
      <h1 className="profile-title">Registro</h1>
      <form onSubmit={formik.handleSubmit} className="profile-form">
        {/* Campo de nombre */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nombre:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-input"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="form-error">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Campo de correo */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Correo electrónico:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-input"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="form-error">{formik.errors.email}</div>
          ) : null}
        </div>

        {/* Campo de contraseña */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-input"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="form-error">{formik.errors.password}</div>
          ) : null}
        </div>

        {/* Botón de registro */}
        <button type="submit" className="form-button">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Profile;