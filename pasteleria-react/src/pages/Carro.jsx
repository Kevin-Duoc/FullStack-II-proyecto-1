import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const obtenerCarro = () => JSON.parse(sessionStorage.getItem('carro') || '[]');
const guardarCarro = (carro) => {
    sessionStorage.setItem('carro', JSON.stringify(carro));
    window.dispatchEvent(new Event('carroActualizado'));
};

const Carro = () => {
    const navigate = useNavigate();
    const [carro, setCarro] = useState(obtenerCarro());
    const [cuponInput, setCuponInput] = useState('');
    const [totalBruto, setTotalBruto] = useState(0);
    const [totalFinal, setTotalFinal] = useState(0);

    // Efecto para asegurar que el usuario esté logueado 
    useEffect(() => {
        if (!sessionStorage.getItem('usuarioActual')) {
            alert('Debes iniciar sesión para ver tu carrito de compras.');
            navigate('/iniciar-sesion');
        }
    }, [navigate]);

    // Función para calcular y actualizar el total
    const calcularTotales = () => {
        const currentCarro = obtenerCarro();
        let subtotal = currentCarro.reduce((sum, item) => sum + (item.precioFinal * item.cantidad), 0);
        let descuentoAplicado = 0;
        
        // La lógica de descuento del 10% por cupón 'FELICES50' 
        if (sessionStorage.getItem('cuponActivo') === 'FELICES50') {
             descuentoAplicado = subtotal * 0.10;
        }

        setTotalBruto(subtotal);
        setTotalFinal(subtotal - descuentoAplicado);
        setCarro(currentCarro);
    };

    // Recalcular cada vez que el carro cambia
    useEffect(() => {
        calcularTotales();
        // Escuchamos el evento de actualización del carrito
        window.addEventListener('carroActualizado', calcularTotales);
        return () => window.removeEventListener('carroActualizado', calcularTotales);
    }, []);

    // Manejadores de Cantidad (que el carro se acumule)
    const handleQuantityChange = (id, change) => {
        let newCarro = carro.map(item => 
            item.id === id ? { ...item, cantidad: Math.max(1, item.cantidad + change) } : item
        );
        guardarCarro(newCarro);
    };

    const handleRemoveItem = (id) => {
        let newCarro = carro.filter(item => item.id !== id);
        guardarCarro(newCarro);
    };

    // Lógica del Cupón 
    const handleCouponSubmit = (e) => {
        e.preventDefault();
        if (cuponInput.toUpperCase() === 'FELICES50') {
            sessionStorage.setItem('cuponActivo', 'FELICES50');
            alert('¡Cupón aplicado con éxito! 10% de descuento aplicado.');
        } else {
            sessionStorage.removeItem('cuponActivo');
            alert('Cupón inválido.');
        }
        calcularTotales();
        setCuponInput(''); // Limpiar input
    };

    // Lógica de Pagar 
    const handlePagar = () => {
        if (carro.length === 0) {
            alert('El carrito está vacío. Agrega productos para pagar.');
            return;
        }
        
        const trackingNumber = 'ORD-' + Date.now().toString().slice(-6);
        const usuario = JSON.parse(sessionStorage.getItem('usuarioActual'));
        
        // Simular guardado del pedido 
        const pedido = {
            id: trackingNumber,
            fecha: new Date().toLocaleDateString('es-CL'),
            cliente: usuario ? usuario.nombreCompleto : 'Cliente',
            estado: 'Procesando',
            monto: totalFinal.toLocaleString('es-CL'),
            usuario: usuario ? usuario.correo : 'invitado',
            productos: carro
        };
        const pedidosAdmin = JSON.parse(sessionStorage.getItem('pedidos') || '[]');
        pedidosAdmin.push(pedido);
        sessionStorage.setItem('pedidos', JSON.stringify(pedidosAdmin));
        
        // Limpieza de Sesión y Carrito
        sessionStorage.removeItem('carro');
        sessionStorage.removeItem('cuponActivo'); // Eliminar cupón
        alert(`¡Compra realizada con éxito! Tu número de pedido es ${trackingNumber}.`);

        window.dispatchEvent(new Event('storageChange'));
        window.dispatchEvent(new Event('compraFinalizada'));

        navigate('/pedidos');
        
        // Recargar para que el Header refleje el carrito vacío
        window.location.reload(); 
    };

    if (!sessionStorage.getItem('usuarioActual')) {
        return null; 
    }
    
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Mi carrito de compras</h1>
            <div className="row">
                {/* LISTADO DE ITEMS */}
                <div className="col-md-8" id="cart-items">
                    {carro.length === 0 ? (
                         <div className="alert alert-warning text-center">Tu carrito de compras está vacío.</div>
                    ) : (
                        carro.map(item => (
                            <div key={item.id} className="d-flex align-items-center mb-4 p-3 border-bottom">
                                <div className="card-img-container me-3" style={{ width: '150px', height: '150px' }}>
                                    <img src={`/images/${item.imagen}`} alt={item.nombre} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                                </div>
                                <div className="ms-3 flex-grow-1">
                                    <h4>{item.nombre}</h4>
                                    <p className="h5">
                                        <strong>${(item.precioFinal * item.cantidad).toLocaleString('es-CL')}</strong>
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                                        <span className="me-2">Cantidad: {item.cantidad}</span>
                                        <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                                        <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RESUMEN DEL CARRO */}
                <div className="col-md-4">
                    <div className="card p-3 sticky-top">
                        <h4 className="text-center">Resumen del Carro</h4>
                        <hr />
                        
                        <p>Subtotal (sin descuentos): ${totalBruto.toLocaleString('es-CL')}</p>
                        
                        {totalBruto !== totalFinal && (
                            <p className="text-success">Descuento Aplicado: - ${(totalBruto - totalFinal).toLocaleString('es-CL')}</p>
                        )}
                        
                        <div className="d-flex justify-content-between mb-3 border-top pt-2">
                            <span>Total Final:</span>
                            <strong id="cart-total" className='h5'>${totalFinal.toLocaleString('es-CL')}</strong>
                        </div>
                        
                        {/* Formulario de Cupón */}
                        <form id="coupon-form" className="input-group mb-3" onSubmit={handleCouponSubmit}>
                            <input type="text" className="form-control" id="coupon-input" 
                                placeholder="Ingresa el cupón" value={cuponInput} 
                                onChange={(e) => setCuponInput(e.target.value)} 
                                aria-label="Cupón de descuento" 
                            />
                            <button className="btn btn-outline-secondary" type="submit">APLICAR</button>
                        </form>
                        
                        <button className="btn btn-success btn-lg mt-3" onClick={handlePagar} disabled={carro.length === 0}>
                            PAGAR (${totalFinal.toLocaleString('es-CL')})
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carro;