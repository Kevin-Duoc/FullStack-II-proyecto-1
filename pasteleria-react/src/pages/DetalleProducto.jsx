import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductos } from '../data/data';

const LOGO_PATH = '/images/logo_empresa.png';

// --- Funciones auxiliares para el carro y descuentos ---
const obtenerCarro = () => {
    // Usamos sessionStorage para que el carrito se borre al cerrar la ventana
    const carro = sessionStorage.getItem('carro');
    return carro ? JSON.parse(carro) : [];
};

const guardarCarro = (carro) => {
    sessionStorage.setItem('carro', JSON.stringify(carro));
    // Disparamos un evento para que el Header (Navbar) actualice el contador del carrito
    window.dispatchEvent(new Event('carroActualizado')); 
};

const obtenerDescuento = () => {
    // Replicamos la lógica de descuento del registro
    if (sessionStorage.getItem('descuentoCincuenta')) {
        return 50; // 50% de descuento (Mayor de 50 años)
    } else if (sessionStorage.getItem('descuentoFelices50')) {
        return 10; // 10% de descuento (Cupón FELICES50)
    } else if (sessionStorage.getItem('descuentoDuoc')) {
        return 10; // 10% de descuento (Correo Duoc)
    }
    return 0;
};
// ----------------------------------------------------


const DetalleProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const producto = getProductos().find(p => p.id === id);
    const descuento = obtenerDescuento();
    
    const [cantidad, setCantidad] = useState(1);
    const [precioDisplay, setPrecioDisplay] = useState(producto ? producto.precio : 0);
    const [precioFinal, setPrecioFinal] = useState(producto ? producto.precio : 0);

    // Efecto para calcular el precio final con el descuento
    useEffect(() => {
        if (producto) {
            const dcto = obtenerDescuento();
            const precioBase = producto.precio;
            const precioConDescuento = Math.round(precioBase * (1 - dcto / 100));
            
            setPrecioDisplay(precioBase);
            setPrecioFinal(precioConDescuento);
        }
    }, [producto]);


    if (!producto) {
        return <h1 className='text-center my-5'>Producto no encontrado.</h1>;
    }

    const handleAddToCart = () => {
        // Punto 1: Debe iniciar sesión o registrarse para añadir al carro
        if (!sessionStorage.getItem('usuarioActual')) {
            alert('Debes iniciar sesión o registrarte para añadir productos al carro.');
            navigate('/iniciar-sesion');
            return;
        }

        if (cantidad <= 0) {
            alert('La cantidad debe ser mayor a 0.');
            return;
        }
        
        let carro = obtenerCarro();
        const itemExistente = carro.find(item => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            // Guardamos el precio final con descuento en el objeto del carrito
            carro.push({ 
                ...producto, 
                cantidad, 
                precioFinal: precioFinal // Usamos el precio ya calculado con el descuento
            });
        }
        
        guardarCarro(carro);
        alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carro.`);
    };

    return (
        <div className="container my-5" id="product-detail-container">
            <div className="row">
                <div className="col-md-6">
                    {/* Imagen Principal */}
                    <div className="product-main-image-container">
                        <img id="product-image" src={`/images/${producto.imagen}`} alt={producto.nombre} className="product-main-image" />
                    </div>
                    {/* Miniaturas */}
                    <div className="d-flex mt-3" id="miniaturas-container">
                        <div className="product-thumbnail me-2"><img src={LOGO_PATH} alt="Miniatura" /></div>
                        <div className="product-thumbnail me-2"><img src={LOGO_PATH} alt="Miniatura" /></div>
                        <div className="product-thumbnail"><img src={LOGO_PATH} alt="Miniatura" /></div>
                    </div>
                </div>
                
                <div className="col-md-6">
                    <h1 id="product-name">{producto.nombre}</h1>
                    
                    {/* Muestra el precio con descuento si aplica */}
                    <p className="h4" id="product-price">
                        {descuento > 0 ? (
                            <>
                                <span style={{ color: 'red', textDecoration: 'line-through', marginRight: '8px' }}>
                                    ${precioDisplay.toLocaleString('es-CL')}
                                </span>
                                <span style={{ color: 'green', fontWeight: 'bold' }}>
                                    ${precioFinal.toLocaleString('es-CL')}
                                </span>
                                <br />
                                <small className='text-success'>({descuento}% dcto aplicado)</small>
                            </>
                        ) : (
                            <strong>${precioFinal.toLocaleString('es-CL')}</strong>
                        )}
                    </p>

                    <p id="product-description">{producto.descripcion}</p>
                    
                    <div className="d-flex align-items-center mb-3">
                        <label htmlFor="cantidad" className="form-label me-2">Cantidad</label>
                        <input type="number" className="form-control" id="cantidad" 
                               value={cantidad} 
                               onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                               min="1" style={{ width: '80px' }} 
                        />
                    </div>
                    
                    <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carro</button>
                </div>
            </div>
            <div className="mt-5">
                <h3>Productos Relacionados</h3>
                <div className="row" id="related-products-container">
                    {/* Aquí la lógica de productos relacionados (simplificada para la migración) */}
                </div>
            </div>
        </div>
    );
};

export default DetalleProducto;