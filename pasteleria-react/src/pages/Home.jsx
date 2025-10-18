import React from 'react';
import { Link } from 'react-router-dom';
// Importamos la lista de productos
import { getProductos } from '../data/data';

const LOGO_PATH = '/images/logo_empresa.png';

// Componente para una tarjeta de producto reutilizable
const ProductCard = ({ producto }) => {
    // Usamos el path de public/images
    const imagePath = `/images/${producto.imagen}`;
    const productUrl = `/productos/${producto.id}`;

    return (
        <div className="col-md-3 mb-4">
            <div className="card">
                <div className="card-img-container">
                    <img src={imagePath} className="card-img-top" alt={producto.nombre} />
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">
                        <strong>${producto.precio.toLocaleString('es-CL')}</strong>
                    </p>
                    {/* Usamos Link de React Router para navegar */}
                    <Link to={productUrl} className="btn btn-primary">Ver detalle</Link>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    // Obtenemos los productos para mostrarlos en la sección destacada
    const productos = getProductos();

    // Mostramos solo 4 productos en el Home, como en el HTML original
    const productosDestacados = productos.slice(0, 4); 

    return (
        <div className="container my-5">
            {/* Sección de Bienvenida/Hero */}
            <section className="row align-items-center mb-5">
                <div className="col-md-6">
                    <span className="site-name"><h1>TIENDA 1000 SABORES</h1></span>
                    <p>Ofrecemos una experiencia dulce y memorable a nuestros clientes, proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones, mientras celebramos nuestras raíces históricas y fomentamos la creatividad en la repostería.</p>
                    <Link to="/productos" className="btn btn-primary">Ver productos</Link>
                </div>
                <div className="col-md-6 text-center">
                    <div className="product-main-image-container">
                        <img src={LOGO_PATH} alt="logo de la empresa" className="company-logo" />
                    </div>
                </div>
            </section>

            {/* Sección de Productos Destacados */}
            <section className="row">
                <div className="col-12 text-center mb-4">
                    <h2>Nuestros Productos</h2>
                </div>
                
                {productosDestacados.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
                
            </section>
        </div>
    );
};

export default Home;