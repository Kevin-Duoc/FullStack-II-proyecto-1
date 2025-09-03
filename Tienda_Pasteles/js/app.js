document.addEventListener('DOMContentLoaded', () => {

    const productos = [
        {
            id: 'prod01',
            nombre: 'Torta Tres Leches',
            descripcion: 'Clásica y deliciosa, con una base de bizcocho esponjoso, remojada en una mezcla de tres leches y cubierta con crema batida. El postre perfecto para cualquier ocasión.',
            precio: 15000,
            imagen: 'torta_tres_leches.jpg'
        },
        {
            id: 'prod02',
            nombre: 'Tarta de Frutas',
            descripcion: 'Una tarta fresca y frutal, con una base de masa quebrada y un relleno de crema pastelera. Decorada con frutas de temporada para un sabor vibrante y delicioso.',
            precio: 10000,
            imagen: 'tarta_frutas.jpg'
        },
        {
            id: 'prod03',
            nombre: 'Brownie Sin Gluten',
            descripcion: 'Un brownie rico y denso, ideal para quienes necesitan evitar el gluten sin sacrificar el sabor. Con un intenso sabor a chocolate y una textura perfecta.',
            precio: 4500,
            imagen: 'brownie_sin_gluten.jpg'
        },
        {
            id: 'prod04',
            nombre: 'Torta Especial Cumpleaños',
            descripcion: 'Una torta personalizada, diseñada para celebrar momentos especiales. Puedes elegir el sabor del bizcocho, el relleno y la decoración para hacerla única.',
            precio: 20000,
            imagen: 'torta_cumpleanos.jpg'
        }
    ];

    const obtenerCarro = () => {
        const carro = localStorage.getItem('carro');
        return carro ? JSON.parse(carro) : [];
    };

    const guardarCarro = (carro) => {
        localStorage.setItem('carro', JSON.stringify(carro));
    };

    const actualizarContadorCarro = () => {
        const carro = obtenerCarro();
        const contador = carro.reduce((total, item) => total + item.cantidad, 0);
        const contadorElement = document.getElementById('cart-count');
        if (contadorElement) {
             contadorElement.textContent = `Carro (${contador})`;
        }
    };

    const listarProductos = () => {
        const productListContainer = document.getElementById('product-list');
        if (productListContainer) {
            productListContainer.innerHTML = '';
            
            productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-3 mb-4';
                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-img-container">
                           <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>
                            <a href="detalleProducto.html?id=${producto.id}" class="btn btn-primary">Ver detalle</a>
                        </div>
                    </div>
                `;
                productListContainer.appendChild(productCard);
            });
        }
    };

    const mostrarDetalleProducto = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const producto = productos.find(p => p.id === productId);

        if (producto) {
            document.getElementById('product-name').textContent = producto.nombre;
            document.getElementById('product-price').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
            document.getElementById('product-description').textContent = producto.descripcion;
            document.getElementById('product-image').src = `images/${producto.imagen}`;
            document.getElementById('product-image').alt = producto.nombre;

            document.getElementById('add-to-cart-btn').addEventListener('click', () => {
                const cantidadInput = document.getElementById('cantidad');
                const cantidad = parseInt(cantidadInput.value, 10);
                if (cantidad > 0) {
                    agregarAlCarro(producto, cantidad);
                } else {
                    alert('La cantidad debe ser un número positivo.');
                }
            });
            mostrarProductosRelacionados(producto.id);
            mostrarMiniaturas(producto.imagen);
        } else {
            const container = document.getElementById('product-detail-container');
            if (container) {
                container.innerHTML = '<div class="alert alert-danger" role="alert">Producto no encontrado.</div>';
            }
        }
    };

    const mostrarMiniaturas = (imagenPrincipal) => {
        const miniaturasContainer = document.getElementById('miniaturas-container');
        if (miniaturasContainer) {
            miniaturasContainer.innerHTML = '';
            // Por simplicidad, usamos la misma imagen para las 3 miniaturas
            for (let i = 0; i < 3; i++) {
                const miniaturaDiv = document.createElement('div');
                miniaturaDiv.className = 'product-thumbnail';
                miniaturaDiv.innerHTML = `<img src="images/${imagenPrincipal}" alt="Miniatura">`;
                miniaturasContainer.appendChild(miniaturaDiv);
            }
        }
    };
    
    const mostrarProductosRelacionados = (currentProductId) => {
        const relatedProductsContainer = document.getElementById('related-products-container');
        if (relatedProductsContainer) {
            const productosFiltrados = productos.filter(p => p.id !== currentProductId);
            
            const productosRelacionados = productosFiltrados.sort(() => 0.5 - Math.random()).slice(0, 4);
            
            relatedProductsContainer.innerHTML = '';

            productosRelacionados.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-3 mb-4';
                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-img-container">
                            <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>
                            <a href="detalleProducto.html?id=${producto.id}" class="btn btn-primary">Ver detalle</a>
                        </div>
                    </div>
                `;
                relatedProductsContainer.appendChild(productCard);
            });
        }
    };

    const agregarAlCarro = (producto, cantidad) => {
        const carro = obtenerCarro();
        const productoExistente = carro.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += cantidad;
        } else {
            carro.push({ ...producto, cantidad });
        }
        guardarCarro(carro);
        actualizarContadorCarro();
        alert(`${cantidad} ${producto.nombre} agregado(s) al carro.`);
    };

    const mostrarCarro = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        if (cartItemsContainer) {
            const carro = obtenerCarro();
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (carro.length === 0) {
                 cartItemsContainer.innerHTML = '<p class="text-center">Tu carro de compras está vacío.</p>';
            } else {
                carro.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'd-flex align-items-center mb-4';
                    const subtotal = item.precio * item.cantidad;
                    total += subtotal;

                    itemElement.innerHTML = `
                        <div style="width: 150px; height: 150px; border: 1px solid #ccc; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                            <img src="images/${item.imagen}" alt="${item.nombre}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="ms-3 flex-grow-1">
                            <h4>${item.nombre}</h4>
                            <p class="text-muted">${item.descripcion}</p>
                            <p class="h5"><strong>$${item.precio.toLocaleString('es-CL')}</strong></p>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-outline-secondary btn-sm me-2 btn-restar" data-id="${item.id}">-</button>
                                <span>${item.cantidad}</span>
                                <button class="btn btn-outline-secondary btn-sm ms-2 btn-sumar" data-id="${item.id}">+</button>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });
            }

            cartTotalElement.textContent = `TOTAL: $${total.toLocaleString('es-CL')}`;

            cartItemsContainer.querySelectorAll('.btn-sumar').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    const carro = obtenerCarro();
                    const producto = carro.find(item => item.id === id);
                    if (producto) {
                        producto.cantidad++;
                        guardarCarro(carro);
                        mostrarCarro();
                        actualizarContadorCarro();
                    }
                });
            });

            cartItemsContainer.querySelectorAll('.btn-restar').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.dataset.id;
                    let carro = obtenerCarro();
                    const producto = carro.find(item => item.id === id);
                    if (producto) {
                        producto.cantidad--;
                        if (producto.cantidad <= 0) {
                            carro = carro.filter(item => item.id !== id);
                        }
                        guardarCarro(carro);
                        mostrarCarro();
                        actualizarContadorCarro();
                    }
                });
            });
        }
    };
    
    // Llamadas globales para que se ejecuten en todas las páginas
    listarProductos();
    mostrarDetalleProducto();
    mostrarCarro();
    actualizarContadorCarro();
});