import './App.css';

// Paquetes
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// Header y Footer
import Header from './components/Header';
import Footer from './components/Footer';

// Páginas clave
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Profile from './pages/Profile';

// Páginas de sitios emblemáticos
import DetalleSitio from './components/DetalleSitio';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />

        <main style={{ flex: '1' }}>
          <Routes>
            {/* Páginas clave */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/error" element={<Error />} />
            
            {/* Página de detalles de sitio */}
            <Route path="/sitio/:id" element={<DetalleSitio />} />

            {/* Página de perfil */}
            <Route path="/profile" element={<Profile />} />

            {/* Redirección a Error para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/error" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;