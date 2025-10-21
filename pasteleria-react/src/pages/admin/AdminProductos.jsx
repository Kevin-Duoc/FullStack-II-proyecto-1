import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// 1. IMPORTAMOS LAS DOS FUNCIONES DE data.js
import { getProductos, eliminarProducto as eliminarProductoDeData } from '../../data/data'; 

const AdminProductos = () => {
    // Usamos useState para tener una copia local de los productos que se pueda actualizar en pantalla
    const [productos, setProductos] = useState(getProductos());

    // 2. ESTA FUNCIÓN AHORA LLAMA A LA LÓGICA CENTRAL
    const handleEliminarProducto = (id) => {
        if (window.confirm(`¿Seguro que quieres eliminar el producto ${id}?`)) {
            // Primero, llamamos a la función de data.js para eliminar el producto de la fuente principal
            eliminarProductoDeData(id);
            
            // Después, actualizamos la vista local para que el cambio se refleje inmediatamente
            // Volvemos a llamar a getProductos() para obtener la lista actualizada desde data.js
            setProductos([...getProductos()]); 

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
                <tbody>
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
                                    {/* 3. El botón ahora llama a nuestra nueva función manejadora */}
                                    <button className="btn btn-sm btn-danger" onClick={() => handleEliminarProducto(producto.id)}>Eliminar</button>
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