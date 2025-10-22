import React, { useState, useEffect } from 'react';

const AdminHome = () => {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const nombre = usuarioActual ? usuarioActual.nombreCompleto.split(' ')[0] : 'Administrador';

    //estado para guardar mensajes
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        const mensajesGuardados = JSON.parse(sessionStorage.getItem('mensajes') || '[]');
        console.log("Mensajes leídos desde sessionStorage:", mensajesGuardados);
        setMensajes(mensajesGuardados);
    }, []);

    return (
        <div className="container-fluid">
            <div className="admin-header p-3 d-flex justify-content-between align-items-center">
                <h2 id="welcome-admin">¡HOLA {nombre.toUpperCase()}!</h2>
                <i className="material-icons">notifications</i>
            </div>

            <div className="p-4">
                <p>Bienvenido al panel de administración. Utiliza el menú lateral para gestionar los productos, usuarios y pedidos de tu tienda.</p>
                
                <div className="row g-4 mt-3">
                    <div className="col-md-4">
                        <div className="card p-3 bg-primary text-white text-center">
                            <h4>Compras</h4>
                            <h1>1,234</h1>
                            <p>Probabilidad de devolución: 20%</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 bg-success text-white text-center">
                            <h4>Productos</h4>
                            <h1>400</h1>
                            <p>Inventario actual: 500</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 bg-warning text-dark text-center">
                            <h4>Usuarios</h4>
                            <h1>890</h1>
                            <p>Nuevos usuarios: 50</p>
                        </div>
                    </div>
                </div>
                
                <div id="mensajes-container" className="mt-5">
                    <h3>Mensajes Recientes de Contacto</h3>
                    
                    {mensajes.length > 0 ? (
                        mensajes.map((mensaje, index) => (
                            <div className="card my-3" key={index}>
                                <div className="card-header d-flex justify-content-between">
                                    <strong>De: {mensaje.nombre} ({mensaje.correo})</strong>
                                    <small>Fecha: {new Date(mensaje.fecha).toLocaleString('es-CL')}</small>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{mensaje.mensaje}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-info mt-3">
                            No hay mensajes recientes.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;