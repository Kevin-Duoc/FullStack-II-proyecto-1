import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProductos } from '../../data/data'; // Importar la data central

const AdminProductos = () => {
    const [productos, setProductos] = useState(getProductos());

    // Para el CRUD real, usaríamos useEffect para cargar la data de sessionStorage
    // Por ahora, usamos los datos fijos de data.js.

    // Simulación de función de eliminación 
    const eliminarProducto = (id) => {
        if (window.confirm(`¿Seguro que quieres eliminar el producto ${id}?`)) {
            const nuevosProductos = productos.filter(p => p.id !== id);
            // Simular guardado de datos en sesión
            sessionStorage.setItem('productos', JSON.stringify(nuevosProductos));
            setProductos(nuevosProductos);
            alert('Producto eliminado con éxito.');
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Productos</h2>
                <Link to="/admin/nuevo-producto" className="btn btn-primary btn-admin-nuevo">NUEVO PRODUCTO</Link>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="productos-table-body">
                    {productos.map(producto => {
                        const isCritico = producto.stock <= producto.stockCritico;
                        return (
                            <tr key={producto.id} className={isCritico ? 'table-danger' : ''}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio.toLocaleString('es-CL')}</td>
                                <td>
                                    {producto.stock}
                                    {isCritico && <p className="text-danger mb-0">¡Stock crítico!</p>}
                                </td>
                                <td>
                                    <button className="btn btn-sm btn-info me-2">Editar</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductos;