import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PedidosCliente = () => {
    const navigate = useNavigate();
    const [pedidos, setPedidos] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState(null);

    const cargarPedidos = () => {
        const user = JSON.parse(sessionStorage.getItem('usuarioActual'));
        
        if (!user) {
            // Si no hay usuario, redirigir y terminar la función
            navigate('/iniciar-sesion');
            return;
        }
        
        setUsuarioActual(user);
        
        // Cargar todos los pedidos
        const todosLosPedidos = JSON.parse(sessionStorage.getItem('pedidos') || '[]');
        
        // Filtrar pedidos: Usamos el correo del usuario logueado
        // Importante: La propiedad del cliente guardada en el pedido es 'usuario' (el correo)
        const misPedidos = todosLosPedidos.filter(p => p.usuario === user.correo);
        
        // Invertir para mostrar los pedidos más recientes primero
        setPedidos(misPedidos.reverse()); 
    };

    useEffect(() => {
        cargarPedidos();
        
        // Escuchamos el evento que se lanza al completar la compra en Carro.jsx
        window.addEventListener('compraFinalizada', cargarPedidos); 
        
        return () => {
             // Limpieza del listener al desmontar el componente
             window.removeEventListener('compraFinalizada', cargarPedidos);
        };
    }, [navigate]);

    // Si el usuario no está cargado (por ejemplo, si estamos redirigiendo al login), no renderizar.
    if (!usuarioActual) {
        return null;
    }

    return (
        <div className="container my-5">
            <section className="row">
                {/* La Navbar ahora se ve, si falla aquí, el problema es el JSX a continuación. */}
                <h1 className="text-center mb-4">Mis Pedidos</h1>
                <div id="lista-pedidos" className="col-12">
                    {pedidos.length === 0 ? (
                        <div className="alert alert-info text-center">
                            Aún no has realizado ningún pedido. ¡Visita la tienda!
                        </div>
                    ) : (
                        pedidos.map((pedido) => (
                            <div key={pedido.id} className="card mb-4 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    Pedido N°: <strong>{pedido.id}</strong> | Fecha: {pedido.fecha}
                                </div>
                                <div className="card-body">
                                    {/* Usamos el operador ?. (optional chaining) para evitar fallos */}
                                    <p><strong>Cliente:</strong> {usuarioActual.nombreCompleto || pedido.usuario}</p>
                                    <p><strong>Estado:</strong> {pedido.estado}</p>
                                    
                                    <h5>Productos:</h5>
                                    <ul className='list-unstyled ms-3'>
                                        {/* Validación para asegurar que 'productos' es un array antes de mapear */}
                                        {Array.isArray(pedido.productos) && pedido.productos.map((item, index) => (
                                            // Usamos item.precioFinal que se guarda en Carro.jsx
                                            <li key={index}>
                                                {item.nombre} (x{item.cantidad}) - ${item.precioFinal?.toLocaleString('es-CL') || item.precio.toLocaleString('es-CL')} c/u
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <h4 className="text-end mt-3">Total: <strong>${pedido.total.toLocaleString('es-CL')}</strong></h4>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default PedidosCliente;