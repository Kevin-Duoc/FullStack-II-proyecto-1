import React from 'react';
import { Link } from 'react-router-dom';
import { getUsuariosFijos } from '../../data/data';

const AdminClientes = () => {
    
    const todosClientes = getUsuariosFijos().filter(u => u.rol === 'cliente');
    
    // Función de eliminación simulada
    const eliminarCliente = (run) => {
        alert(`Simulando eliminación del cliente con RUN: ${run}.`);
        // En una aplicación real, esta lógica debería actualizar el estado.
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Clientes</h2>
                <Link to="/admin/nuevo-usuario" className="btn btn-primary btn-admin-nuevo">NUEVO CLIENTE</Link>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>RUN</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Tipo de Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="clientes-table-body">
                    {todosClientes.map((cliente) => (
                        <tr key={cliente.correo}>
                            <td>{cliente.run || 'N/A'}</td>
                            <td>{cliente.nombreCompleto}</td>
                            <td>{cliente.correo}</td>
                            <td>Cliente</td>
                            <td>
                                <button className="btn btn-sm btn-info me-2">Editar</button>
                                <button className="btn btn-sm btn-danger" onClick={() => eliminarCliente(cliente.run)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminClientes;