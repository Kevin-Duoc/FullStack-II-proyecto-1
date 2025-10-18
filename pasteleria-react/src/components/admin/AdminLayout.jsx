import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
    // Nota: La lógica de permisos real se aplicará más tarde.
    return (
        <div className="d-flex">
            {/* Sidebar - Menú Admin (Migrado de menu-admin.html) */}
            <div className="admin-sidebar p-3 d-flex flex-column justify-content-between">
                <div>
                    <h4 className="text-white">Pastelería 1000 Sabores</h4>
                    <ul className="nav flex-column mt-4" id="admin-menu">
                        <li className="nav-item"><Link className="nav-link" to="/admin">Panel de Control</Link></li>
                        <li className="nav-item" data-role="administrador,vendedor"><Link className="nav-link" to="/admin/productos">Productos</Link></li>
                        <li className="nav-item" data-role="administrador,vendedor"><Link className="nav-link" to="/admin/pedidos">Pedidos</Link></li>
                        {/* Se añaden el resto de links del diagrama de flujo para la estructura de rutas */}
                        <li className="nav-item" data-role="administrador"><Link className="nav-link" to="/admin/inventario">Inventario</Link></li>
                        <li className="nav-item" data-role="administrador"><Link className="nav-link" to="/admin/clientes">Clientes</Link></li>
                        <li className="nav-item" data-role="administrador"><Link className="nav-link" to="/admin/empleados">Empleados</Link></li>
                        <li className="nav-item" data-role="administrador"><Link className="nav-link" to="/admin/reportes">Reportes</Link></li>
                    </ul>
                </div>
                <div className="mt-auto">
                    {/* Botones inferiores */}
                    <a className="nav-link" href="#" onClick={() => window.location.href = '/'}>
                        <i className="material-icons">store</i> Ver Tienda
                    </a>
                    <a className="nav-link" href="#" onClick={() => sessionStorage.clear()}>
                        <i className="material-icons">logout</i> Cerrar Sesión
                    </a>
                </div>
            </div>

            {/* Contenido Principal */}
            <div className="admin-content flex-grow-1">
                <header className="admin-header p-3 d-flex justify-content-between align-items-center">
                    <h2>Panel de Administración</h2>
                </header>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;