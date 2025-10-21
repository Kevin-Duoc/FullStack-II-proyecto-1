import React, { useState, useEffect } from 'react';

const AdminPedidos = () => {
    // Usamos useState para cargar y gestionar los pedidos desde sessionStorage
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        // Cargar pedidos desde sessionStorage (incluye los pedidos de prueba fijos)
        const pedidosEnSession = JSON.parse(sessionStorage.getItem('pedidos') || '[]');
        setPedidos(pedidosEnSession);
    }, []);

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Pedidos</h2>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Pedido #</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Monto</th>
                    </tr>
                </thead>
                <tbody id="pedidos-table-body">
                    {pedidos.map(pedido => (
                        <tr key={pedido.id}>
                            <td>{pedido.fecha}</td>
                            <td>{pedido.id}</td>
                            <td>{pedido.cliente}</td>
                            <td>{pedido.estado}</td>
                            <td>${pedido.monto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPedidos;