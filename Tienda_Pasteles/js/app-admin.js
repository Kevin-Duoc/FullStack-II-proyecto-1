document.addEventListener('DOMContentLoaded', () => {

    const productos = [
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

    const empleados = [
        { run: '12345678-9', nombre: 'Ana Torres', cargo: 'Vendedor', correo: 'ana@duoc.cl' },
        { run: '98765432-1', nombre: 'Luis Gámez', cargo: 'Vendedor', correo: 'luis@duoc.cl' },
        { run: '11223344-5', nombre: 'Sofía Mena', cargo: 'Administrador', correo: 'sofia@duoc.cl' },
    ];

    const clientes = [
        { run: '19011022K', nombre: 'Juan Pérez', correo: 'juan@gmail.com' },
        { run: '20545678-9', nombre: 'María García', correo: 'maria@gmail.com' },
        { run: '18456789-2', nombre: 'Pedro López', correo: 'pedro@gmail.com' },
    ];

    const pedidos = [
        { fecha: '2024-06-01', numero: 'P001', cliente: 'Juan Pérez', estado: 'Enviado', monto: '15.000' },
        { fecha: '2024-06-02', numero: 'P002', cliente: 'María García', estado: 'Pendiente', monto: '20.000' },
        { fecha: '2024-06-03', numero: 'P003', cliente: 'Pedro López', estado: 'Cancelado', monto: '10.000' },
    ];

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
                        <a href="#" class="btn btn-sm btn-info">Editar</a>
                        <a href="#" class="btn btn-sm btn-danger">Eliminar</a>
                    </td>
                `;
                tableBody.appendChild(row);
            });
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
                        <a href="#" class="btn btn-sm btn-info">Editar</a>
                        <a href="#" class="btn btn-sm btn-danger">Eliminar</a>
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
                        <a href="#" class="btn btn-sm btn-info">Editar</a>
                        <a href="#" class="btn btn-sm btn-danger">Eliminar</a>
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
                    <td>${pedido.numero}</td>
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
                    stockStatusText = 'Stock crítico';
                    stockStatusClass = 'text-danger';
                }
                
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.stock}</td>
                    <td><span class="${stockStatusClass}">${stockStatusText}</span></td>
                `;
                tableBody.appendChild(row);
            });
        }
    };

    // Llama a las funciones solo en sus respectivas páginas
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
});