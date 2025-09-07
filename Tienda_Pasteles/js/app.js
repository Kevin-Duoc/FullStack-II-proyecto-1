document.addEventListener('DOMContentLoaded', () => {

    const productos = [
        {
            id: 'TC001',
            nombre: 'Torta Cuadrada de Chocolate',
            descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
            precio: 45000,
            imagen: 'torta_cuadrada_chocolate.jpg'
        },
        {
            id: 'TC002',
            nombre: 'Torta Cuadrada de Frutas',
            descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
            precio: 50000,
            imagen: 'torta_cuadrada_frutas.jpg'
        },
        {
            id: 'TT001',
            nombre: 'Torta Circular de Vainilla',
            descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
            precio: 40000,
            imagen: 'torta_circular_vainilla.jpg'
        },
        {
            id: 'TT002',
            nombre: 'Torta Circular de Manjar',
            descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
            precio: 42000,
            imagen: 'torta_circular_manjar.jpg'
        },
        {
            id: 'PI001',
            nombre: 'Mousse de Chocolate',
            descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
            precio: 5000,
            imagen: 'mousse_chocolate.jpg'
        },
        {
            id: 'PI002',
            nombre: 'Tiramisú Clásico',
            descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
            precio: 5500,
            imagen: 'tiramisu_clasico.jpg'
        },
        {
            id: 'PSA001',
            nombre: 'Torta Sin Azúcar de Naranja',
            descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
            precio: 48000,
            imagen: 'torta_sin_azucar_naranja.jpg'
        },
        {
            id: 'PSA002',
            nombre: 'Cheesecake Sin Azúcar',
            descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
            precio: 47000,
            imagen: 'cheesecake_sin_azucar.jpg'
        },
        {
            id: 'PT001',
            nombre: 'Empanada de Manzana',
            descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
            precio: 3000,
            imagen: 'empanada_manzana.jpg'
        },
        {
            id: 'PT002',
            nombre: 'Tarta de Santiago',
            descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
            precio: 6000,
            imagen: 'tarta_santiago.jpg'
        },
        {
            id: 'PG001',
            nombre: 'Brownie Sin Gluten',
            descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
            precio: 4000,
            imagen: 'brownie_sin_gluten.jpg'
        },
        {
            id: 'PG002',
            nombre: 'Pan Sin Gluten',
            descripcion: 'Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida.',
            precio: 3500,
            imagen: 'pan_sin_gluten.jpg'
        },
        {
            id: 'PV001',
            nombre: 'Torta Vegana de Chocolate',
            descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
            precio: 50000,
            imagen: 'torta_vegana_chocolate.jpg'
        },
        {
            id: 'PV002',
            nombre: 'Galletas Veganas de Avena',
            descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
            precio: 4500,
            imagen: 'galletas_veganas_avena.jpg'
        },
        {
            id: 'TE001',
            nombre: 'Torta Especial de Cumpleaños',
            descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
            precio: 55000,
            imagen: 'torta_especial_cumpleanos.jpg'
        },
        {
            id: 'TE002',
            nombre: 'Torta Especial de Boda',
            descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
            precio: 60000,
            imagen: 'torta_especial_boda.jpg'
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
        let productId = urlParams.get('id');
        
        // Carga el primer producto por defecto si no hay un ID en la URL
        if (!productId) {
            productId = productos[0].id;
        }

        const producto = productos.find(p => p.id === productId);

        if (producto) {
            document.getElementById('product-name').textContent = producto.nombre;
            document.getElementById('product-price').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
            document.getElementById('product-description').textContent = producto.descripcion;
            
            const productImage = document.getElementById('product-image');
            if (productImage) {
                productImage.src = `images/${producto.imagen}`;
                productImage.alt = producto.nombre;
            }

            const addToCartBtn = document.getElementById('add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    agregarAlCarro(producto, 1);
                });
            }
            mostrarProductosRelacionados(producto.id);
            mostrarMiniaturas(producto.imagen);
        } else {
            const container = document.getElementById('product-detail-container');
            if (container) {
                container.innerHTML = '<div class="alert alert-danger" role="alert">Producto no encontrado. Por favor, navega desde la página de productos.</div>';
            }
        }
    };

    const mostrarMiniaturas = (imagenPrincipal) => {
        const miniaturasContainer = document.getElementById('miniaturas-container');
        if (miniaturasContainer) {
            miniaturasContainer.innerHTML = '';
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
        const carro = [{ ...producto, cantidad }];
        guardarCarro(carro);
        actualizarContadorCarro();
        alert(`${cantidad} ${producto.nombre} agregado(s) al carro.`);
    };

    const mostrarCarro = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        let carro = obtenerCarro();
        
        if (cartItemsContainer) {
            if (carro.length === 0) {
                const productosPorDefecto = [
                    productos.find(p => p.id === 'PI001'),
                    productos.find(p => p.id === 'PT002'),
                    productos.find(p => p.id === 'TE001')
                ];
                carro = productosPorDefecto.filter(p => p).map(p => ({ ...p, cantidad: 1 }));
                guardarCarro(carro);
            }
            
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
                        <div class="card-img-container" style="width: 150px; height: 150px;">
                            <img src="images/${item.imagen}" alt="${item.nombre}">
                        </div>
                        <div class="ms-3 flex-grow-1">
                            <h4>${item.nombre}</h4>
                            <p class="h5"><strong>$${subtotal.toLocaleString('es-CL')}</strong></p>
                            <div class="d-flex align-items-center">
                                <span>Cantidad: ${item.cantidad}</span>
                            </div>
                        </div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                });
            }
            if (cartTotalElement) {
                cartTotalElement.textContent = `TOTAL: $${total.toLocaleString('es-CL')}`;
            }
        }
    };
    
    // Llamadas globales
    listarProductos();
    mostrarDetalleProducto();
    mostrarCarro();
    actualizarContadorCarro();
});