import React from 'react';
import { getProductos } from '../data/data';
import { Link } from 'react-router-dom';

// Componente para una tarjeta de producto reutilizable (similar al de Home.jsx)
const ProductCard = ({ producto }) => {
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
                    <Link to={productUrl} className="btn btn-primary">Ver detalle</Link>
                </div>
            </div>
        </div>
    );
};

const Productos = () => {
    const todosProductos = getProductos();

    return (
        <div className="container my-5">
            <h1 className='text-center'>PÁGINA: Productos</h1>
            <p className='text-center'>Aquí puedes ver todo nuestro catálogo.</p>
            <section className="row">
                {todosProductos.map((producto) => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </section>
        </div>
    );
};

export default Productos;