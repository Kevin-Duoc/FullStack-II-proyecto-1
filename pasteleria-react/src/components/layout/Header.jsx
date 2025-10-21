import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LOGO_PATH = '/images/logo_empresa.png';

const Header = () => {
    // Definimos el estado del usuario y el carrito para forzar el re-renderizado.
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    // Función de Logout: Limpia la sesión y notifica el cambio
    const handleLogout = () => {
        sessionStorage.clear();
        // Dispara un evento ficticio para forzar la re-renderización de la Navbar
        window.dispatchEvent(new Event('storageChange')); 
        window.location.href = '/'; 
    };

    // Función para obtener y calcular el estado del carrito
    const updateCartState = () => {
        const currentCart = JSON.parse(sessionStorage.getItem('carro') || '[]');
        const count = currentCart.reduce((total, item) => total + item.cantidad, 0);
        setCartCount(count);
    };

    // Función para obtener el estado de la sesión
    const updateUserState = () => {
        const user = JSON.parse(sessionStorage.getItem('usuarioActual'));
        setUsuarioActual(user);
    };

    useEffect(() => {
        // Ejecutar al montar para la primera carga
        updateUserState();
        updateCartState();

        // Creamos un listener para escuchar cambios de sesión y carrito 
        // Esto reemplaza la lógica de layout.js y hace el Header reactivo
        const handleStorageChange = () => {
            updateUserState();
            updateCartState();
        };

        window.addEventListener('storageChange', handleStorageChange);
        window.addEventListener('carroActualizado', handleStorageChange); 
        
        return () => {
            window.removeEventListener('storageChange', handleStorageChange);
            window.removeEventListener('carroActualizado', handleStorageChange);
        };
    }, []);

    // Función para determinar si el botón 'Panel Admin' debe mostrarse
    const shouldShowAdminPanel = usuarioActual && 
        (usuarioActual.rol === 'administrador' || usuarioActual.rol === 'vendedor');

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    {/* ... Código del Logo ... */}
                    <Link className="navbar-brand" to="/">
                        <img src={LOGO_PATH} alt="Logo de Pastelería 1000 Sabores" style={{ height: '40px', marginRight: '10px' }} />
                        <span className="site-name">Pastelería 1000 Sabores</span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            {/* ... Enlaces Centrales ... */}
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/blogs">Blogs</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
                        </ul>

                        {/* Controles de Usuario y Carrito */}
                        <div id="nav-right" className="d-flex align-items-center">
                            
                            {usuarioActual ? (
                                // Menú de Bienvenida Desplegable
                                <div className="d-flex align-items-center">
                                    
                                    {shouldShowAdminPanel && (
                                        <Link to="/admin" className="nav-link-personalizado me-2">Panel Admin</Link>
                                    )}
                                    
                                    <ul className="navbar-nav me-2">
                                        <li className="nav-item dropdown">
                                            {/* El nombre de la persona */}
                                            <button className="nav-link-personalizado dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                                ¡Hola, {usuarioActual.nombreCompleto.split(' ')[0] || 'Usuario'}!
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><Link className="dropdown-item" to="/ajustes">Ajustes</Link></li>
                                                <li><Link className="dropdown-item" to="/pedidos">Ver pedidos</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                {/*Cerrar Sesión Cliente */}
                                                <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                // Vista de Usuario No Logueado
                                <ul className="navbar-nav me-2">
                                    <li className="nav-item me-2"><Link className="nav-link-personalizado" to="/iniciar-sesion">Iniciar sesión</Link></li>
                                    <li className="nav-item"><Link className="nav-link-personalizado" to="/registro">Registrarse</Link></li>
                                </ul>
                            )}

                            {/* Carrito con Contador Dinámico */}
                            <Link className="nav-link" to="/carro">
                                <i className="material-icons">shopping_cart</i> <span id="cart-count"> Carro ({cartCount})</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;