// js/app-admin.js

document.addEventListener('DOMContentLoaded', () => {

    const productosDefault = [
        { id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, stock: 15, stockCritico: 5, categoria: 'Tortas Cuadradas' },
        { id: 'TC002', nombre: 'Torta Cuadrada de Frutas', precio: 50000, stock: 8, stockCritico: 5, categoria: 'Tortas Cuadradas' },
        { id: 'TT001', nombre: 'Torta Circular de Vainilla', precio: 40000, stock: 20, stockCritico: 10, categoria: 'Tortas Circulares' },
        { id: 'TT002', nombre: 'Torta Circular de Manjar', precio: 42000, stock: 3, stockCritico: 5, categoria: 'Tortas Circulares' },
        { id: 'PI001', nombre: 'Mousse de Chocolate', precio: 5000, stock: 50, stockCritico: 20, categoria: 'Postres Individuales' },
        { id: 'PI002', nombre: 'Tiramisú Clásico', precio: 5500, stock: 10, stockCritico: 5, categoria: 'Postres Individuales' },
        { id: 'PSA001', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, stock: 12, stockCritico: 5, categoria: 'Productos Sin Azúcar' },
        { id: 'PSA002', nombre: 'Cheesecake Sin Azúcar', precio: 47000, stock: 1, stockCritico: 3, categoria: 'Productos Sin Azúcar' },
        { id: 'PT001', nombre: 'Empanada de Manzana', precio: 3000, stock: 100, stockCritico: 50, categoria: 'Pastelería Tradicional' },
        { id: 'PT002', nombre: 'Tarta de Santiago', precio: 6000, stock: 25, stockCritico: 10, categoria: 'Pastelería Tradicional' },
        { id: 'PG001', nombre: 'Brownie Sin Gluten', precio: 4000, stock: 8, stockCritico: 5, categoria: 'Productos Sin Gluten' },
        { id: 'PG002', nombre: 'Pan Sin Gluten', precio: 3500, stock: 2, stockCritico: 5, categoria: 'Productos Sin Gluten' },
        { id: 'PV001', nombre: 'Torta Vegana de Chocolate', precio: 50000, stock: 7, stockCritico: 5, categoria: 'Productos Vegana' },
        { id: 'PV002', nombre: 'Galletas Veganas de Avena', precio: 4500, stock: 15, stockCritico: 10, categoria: 'Productos Vegana' },
        { id: 'TE001', nombre: 'Torta Especial de Cumpleaños', precio: 55000, stock: 6, stockCritico: 5, categoria: 'Tortas Especiales' },
        { id: 'TE002', nombre: 'Torta Especial de Boda', precio: 60000, stock: 0, stockCritico: 1, categoria: 'Tortas Especiales' },
    ];
    const empleadosDefault = [
        { run: '12345678-9', nombre: 'Ana Torres', cargo: 'Vendedor', correo: 'ana@duoc.cl' },
        { run: '98765432-1', nombre: 'Luis Gámez', cargo: 'Vendedor', correo: 'luis@duoc.cl' },
        { run: '11223344-5', nombre: 'Sofía Mena', cargo: 'Administrador', correo: 'sofia@duoc.cl' },
    ];
    const clientesDefault = [
        { run: '19011022K', nombre: 'Juan Pérez', correo: 'juan@gmail.com' },
        { run: '20545678-9', nombre: 'María García', correo: 'maria@gmail.com' },
        { run: '18456789-2', nombre: 'Pedro López', correo: 'pedro@gmail.com' },
    ];
    const pedidosDefault = [
        { id: 'P001', fecha: '2025-09-01', cliente: 'Juan Pérez', estado: 'Procesando', monto: '15.000' },
        { id: 'P002', fecha: '2025-09-02', cliente: 'María García', estado: 'En tránsito', monto: '20.000' },
        { id: 'P003', fecha: '2025-09-03', cliente: 'Pedro López', estado: 'Entregado', monto: '10.000' },
        { id: 'P004', fecha: '2025-09-04', cliente: 'Ana Torres', estado: 'Cancelado', monto: '5.000' }
    ];

    let productos = JSON.parse(sessionStorage.getItem('productos')) || productosDefault;
    let empleados = JSON.parse(sessionStorage.getItem('empleados')) || empleadosDefault;
    let clientes = JSON.parse(sessionStorage.getItem('clientes')) || clientesDefault;
    let pedidos = JSON.parse(sessionStorage.getItem('pedidos')) || pedidosDefault;
    
    if (!sessionStorage.getItem('productos')) {
        sessionStorage.setItem('productos', JSON.stringify(productosDefault));
    }
    if (!sessionStorage.getItem('empleados')) {
        sessionStorage.setItem('empleados', JSON.stringify(empleadosDefault));
    }
    if (!sessionStorage.getItem('clientes')) {
        sessionStorage.setItem('clientes', JSON.stringify(clientesDefault));
    }
    if (!sessionStorage.getItem('pedidos')) {
        sessionStorage.setItem('pedidos', JSON.stringify(pedidosDefault));
    }

    const guardarDatos = (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    };

    const listarProductosAdmin = () => {
        const tableBody = document.getElementById('productos-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            productos.forEach(producto => {
                const row = document.createElement('tr');
                let stockStatusClass = '';
                if (producto.stock <= producto.stockCritico) {
                    stockStatusClass = 'table-danger';
                }
                row.className = stockStatusClass;
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>$${producto.precio.toLocaleString('es-CL')}</td>
                    <td>${producto.stock}</td>
                    <td>
                        <button class="btn btn-sm btn-info edit-product" data-id="${producto.id}">Editar</button>
                        <button class="btn btn-sm btn-danger delete-product" data-id="${producto.id}">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            document.querySelectorAll('.delete-product').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    eliminarProducto(id);
                });
            });
        }
    };
    
    const eliminarProducto = (id) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el producto con código ${id}?`)) {
            productos = productos.filter(p => p.id !== id);
            guardarDatos('productos', productos);
            listarProductosAdmin();
            alert('Producto eliminado con éxito.');
        }
    };
    
    const listarEmpleadosAdmin = () => {
        const tableBody = document.getElementById('empleados-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            empleados.forEach(empleado => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${empleado.run}</td>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.correo}</td>
                    <td>${empleado.cargo}</td>
                    <td>
                        <button class="btn btn-sm btn-info">Editar</button>
                        <button class="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    };

    const listarClientesAdmin = () => {
        const tableBody = document.getElementById('clientes-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            clientes.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${cliente.run}</td>
                    <td>${cliente.nombre}</td>
                    <td>${cliente.correo}</td>
                    <td>Cliente</td>
                    <td>
                        <button class="btn btn-sm btn-info">Editar</button>
                        <button class="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    };

    const listarPedidosAdmin = () => {
        const tableBody = document.getElementById('pedidos-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            pedidos.forEach(pedido => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${pedido.fecha}</td>
                    <td>${pedido.id}</td>
                    <td>${pedido.cliente}</td>
                    <td>${pedido.estado}</td>
                    <td>$${pedido.monto}</td>
                `;
                tableBody.appendChild(row);
            });
        }
    };

    const listarInventarioAdmin = () => {
        const tableBody = document.getElementById('inventario-table-body');
        if (tableBody) {
            tableBody.innerHTML = '';
            productos.forEach(producto => {
                const row = document.createElement('tr');
                let stockStatusText = 'Normal';
                let stockStatusClass = '';

                if (producto.stock <= producto.stockCritico) {
                    stockStatusText = 'Crítico';
                    stockStatusClass = 'text-danger';
                }
                
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>
                        <input type="number" class="form-control form-control-sm" value="${producto.stock}" data-id="${producto.id}" min="0">
                    </td>
                    <td><span class="${stockStatusClass}">${stockStatusText}</span></td>
                `;
                tableBody.appendChild(row);
            });
            
            tableBody.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('change', (e) => {
                    const id = e.target.getAttribute('data-id');
                    const newStock = parseInt(e.target.value, 10);
                    const producto = productos.find(p => p.id === id);
                    if (producto) {
                        producto.stock = newStock;
                        guardarDatos('productos', productos);
                        listarInventarioAdmin();
                    }
                });
            });
        }
    };
    
    // Obtiene el usuario de la sesión y actualiza el mensaje de bienvenida
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    if (usuarioActual && window.location.pathname.includes('home-admin.html')) {
        const welcomeAdmin = document.getElementById('welcome-admin');
        if (welcomeAdmin) {
            welcomeAdmin.textContent = `¡HOLA ${usuarioActual.rol.toUpperCase()}!`;
        }
    }
    
    if (window.location.pathname.includes('productos-admin.html')) {
        listarProductosAdmin();
    }
    if (window.location.pathname.includes('empleados-admin.html')) {
        listarEmpleadosAdmin();
    }
    if (window.location.pathname.includes('clientes-admin.html')) {
        listarClientesAdmin();
    }
    if (window.location.pathname.includes('pedidos-admin.html')) {
        listarPedidosAdmin();
    }
    if (window.location.pathname.includes('inventario-admin.html')) {
        listarInventarioAdmin();
    }
    
    const formNuevoProducto = document.getElementById('form-nuevo-producto');
    if (formNuevoProducto) {
        formNuevoProducto.addEventListener('submit', (e) => {
            e.preventDefault();
            const codigo = document.getElementById('codigo').value;
            const nombre = document.getElementById('nombre').value;
            const descripcion = document.getElementById('descripcion').value;
            const precio = parseFloat(document.getElementById('precio').value);
            const stock = parseInt(document.getElementById('stock').value);
            const stockCritico = document.getElementById('stockCritico').value ? parseInt(document.getElementById('stockCritico').value) : 0;
            const categoria = document.getElementById('categoria').value;
            const imagen = document.getElementById('imagen').files[0] ? document.getElementById('imagen').files[0].name : '';

            if (productos.some(p => p.id === codigo)) {
                alert('Ya existe un producto con este código.');
                return;
            }

            const nuevoProducto = {
                id: codigo,
                nombre,
                descripcion,
                precio,
                stock,
                stockCritico,
                categoria,
                imagen
            };

            productos.push(nuevoProducto);
            guardarDatos('productos', productos);
            alert('Producto guardado con éxito.');
            window.location.href = 'productos-admin.html';
        });
    }
    
    const formNuevoUsuario = document.getElementById('form-nuevo-usuario');
    if (formNuevoUsuario) {
        formNuevoUsuario.addEventListener('submit', (e) => {
            e.preventDefault();
            const run = document.getElementById('run').value.trim();
            const nombre = document.getElementById('nombre').value.trim();
            const apellidos = document.getElementById('apellidos').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const tipoUsuario = document.getElementById('tipoUsuario').value;
            const region = document.getElementById('region').value;
            const comuna = document.getElementById('comuna').value;
            const direccion = document.getElementById('direccion').value.trim();

            const nuevoUsuario = {
                run,
                nombre: nombre + ' ' + apellidos,
                correo,
                fechaNacimiento,
                rol: tipoUsuario,
                region,
                comuna,
                direccion
            };
            
            let usuariosExistentes = JSON.parse(sessionStorage.getItem('usuarios')) || [];
            if (usuariosExistentes.some(u => u.correo === correo)) {
                alert('Ya existe un usuario con este correo.');
                return;
            }

            if (tipoUsuario === 'cliente') {
                let clientesExistentes = JSON.parse(sessionStorage.getItem('clientes')) || clientesDefault;
                clientesExistentes.push(nuevoUsuario);
                guardarDatos('clientes', clientesExistentes);
                window.location.href = 'clientes-admin.html';
            } else {
                let empleadosExistentes = JSON.parse(sessionStorage.getItem('empleados')) || empleadosDefault;
                empleadosExistentes.push(nuevoUsuario);
                guardarDatos('empleados', empleadosExistentes);
                window.location.href = 'empleados-admin.html';
            }
            
            usuariosExistentes.push(nuevoUsuario);
            sessionStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));

            alert('Usuario registrado con éxito.');
        });
    }

    const categoriaSelect = document.getElementById('categoria');
    if (categoriaSelect) {
        const categorias = [
            'Tortas Cuadradas', 'Tortas Circulares', 'Postres Individuales',
            'Productos Sin Azúcar', 'Pastelería Tradicional', 'Productos Sin Gluten',
            'Productos Vegana', 'Tortas Especiales'
        ];
        categorias.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoriaSelect.appendChild(option);
        });
    }
});