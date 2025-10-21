import { describe, it, expect, beforeEach } from 'vitest';
import { getProductos, agregarProducto, actualizarProducto, eliminarProducto, productos } from './data.js';

// Hacemos una copia de los productos originales para reiniciar en cada prueba
const productosOriginales = JSON.parse(JSON.stringify(productos));

beforeEach(() => {
  // Reiniciamos el array de productos a su estado original antes de cada 'it'
  // Esto asegura que una prueba no afecte a la siguiente.
  productos.length = 0;
  productos.push(...JSON.parse(JSON.stringify(productosOriginales)));
});


describe('Funciones CRUD de data.js', () => {

  it('debería agregar un nuevo producto a la lista', () => {
    const numeroInicial = getProductos().length;
    const nuevoProducto = { id: 'TEST001', nombre: 'Torta de Prueba' };
    agregarProducto(nuevoProducto);
    const productosActuales = getProductos();
    expect(productosActuales.length).toBe(numeroInicial + 1);
    expect(productosActuales[productosActuales.length - 1]).toEqual(nuevoProducto);
  });

  it('debería actualizar un producto existente', () => {
    const idProductoAActualizar = 'TC001';
    const datosActualizados = { nombre: 'NUEVO NOMBRE DE TORTA', precio: 99999 };

    actualizarProducto(idProductoAActualizar, datosActualizados);
    const productosActuales = getProductos();
    const productoActualizado = productosActuales.find(p => p.id === idProductoAActualizar);

    expect(productoActualizado.nombre).toBe('NUEVO NOMBRE DE TORTA');
    expect(productoActualizado.precio).toBe(99999);
  });

  it('debería eliminar un producto existente', () => {
    const idProductoAEliminar = 'TC001';
    const numeroInicial = getProductos().length;

    eliminarProducto(idProductoAEliminar);
    const productosActuales = getProductos();
    const productoEliminado = productosActuales.find(p => p.id === idProductoAEliminar);

    expect(productosActuales.length).toBe(numeroInicial - 1);
    expect(productoEliminado).toBeUndefined();
  });
});