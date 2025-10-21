import React from 'react';
import { Link } from 'react-router-dom';

// Datos de categorías simuladas (basadas en tus productos de data.js)
const categoriasData = [
    { name: 'Tortas Cuadradas', image: '/images/torta_cuadrada_chocolate.jpg', url: '/categorias/cuadradas' },
    { name: 'Tortas Circulares', image: '/images/torta_circular_vainilla.jpg', url: '/categorias/circulares' },
    { name: 'Postres Individuales', image: '/images/mousse_chocolate.jpg', url: '/categorias/individuales' },
    { name: 'Productos Sin Azúcar', image: '/images/cheesecake_sin_azucar.jpg', url: '/categorias/sin-azucar' },
];

const Categorias = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-5">Nuestras Categorías</h1>

            {/* Módulo de Navegación por Categorías (Similar a la Figura 5) */}
            <section className="row justify-content-center mb-5">
                {categoriasData.map((cat, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div className="card text-center">
                            <div className="card-img-container" style={{ height: '180px' }}>
                                <img src={cat.image} alt={cat.name} className="card-img-top" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{cat.name}</h5>
                                <Link to={cat.url} className="btn btn-primary">Ver Categoría</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Contenido de una Categoría Específica (Categoría 1) */}
            <h2 className="mb-4">Categoría 1: Tortas Especiales</h2>
            <section className="row">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-img-container" style={{ height: '300px' }}>
                            <span>400 x 300</span>
                        </div>
                    </div>
                </div>
                {/* Se repetirían más tarjetas de productos aquí */}
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-img-container" style={{ height: '300px' }}>
                            <span>400 x 300</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-img-container" style={{ height: '300px' }}>
                            <span>400 x 300</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-img-container" style={{ height: '300px' }}>
                            <span>400 x 300</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Categorias;