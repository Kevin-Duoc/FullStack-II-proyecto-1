// js/pedidos-cliente.js

document.addEventListener('DOMContentLoaded', () => {
    const pedidosContainer = document.getElementById('lista-pedidos');
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));

    if (!usuarioActual) {
        pedidosContainer.innerHTML = '<div class="alert alert-danger">Debes iniciar sesión para ver tus pedidos.</div>';
        return;
    }

    const pedidos = JSON.parse(sessionStorage.getItem('pedidos')) || [];
    const misPedidos = pedidos.filter(p => p.usuario === usuarioActual.correo);

    if (misPedidos.length === 0) {
        pedidosContainer.innerHTML = '<div class="alert alert-info">No has realizado ningún pedido todavía.</div>';
    } else {
        misPedidos.forEach(pedido => {
            const pedidoCard = document.createElement('div');
            pedidoCard.className = 'card mb-4 shadow-sm';
            
            let productosHTML = pedido.productos.map(p => `
                <li>${p.nombre} (x${p.cantidad}) - $${p.precioFinal.toLocaleString('es-CL')} c/u</li>
            `).join('');

            pedidoCard.innerHTML = `
                <div class="card-header bg-primary text-white">
                    Pedido N°: <strong>${pedido.id}</strong> | Fecha: ${pedido.fecha}
                </div>
                <div class="card-body">
                    <p><strong>Estado:</strong> ${pedido.estado}</p>
                    <h5>Productos:</h5>
                    <ul>
                        ${productosHTML}
                    </ul>
                    <h4 class="text-end">Total: <strong>$${pedido.total.toLocaleString('es-CL')}</strong></h4>
                </div>
            `;
            pedidosContainer.appendChild(pedidoCard);
        });
    }
});