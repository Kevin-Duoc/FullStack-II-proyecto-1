// js/app.js

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
        const carro = sessionStorage.getItem('carro');
        return carro ? JSON.parse(carro) : [];
    };

    const guardarCarro = (carro) => {
        sessionStorage.setItem('carro', JSON.stringify(carro));
        window.dispatchEvent(new Event('carroActualizado')); 
    };
    
    const obtenerDescuento = () => {
        if (sessionStorage.getItem('descuentoCincuenta')) {
            return 50;
        } else if (sessionStorage.getItem('descuentoFelices50')) {
            return 10;
        }
        return 0;
    };
    
    const listarProductos = () => {
        const productListContainer = document.getElementById('product-list');
        if (productListContainer) {
            productListContainer.innerHTML = '';
            const descuento = obtenerDescuento();
            
            productos.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-3 mb-4';
                
                let precioHTML = `<p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>`;
                if (descuento > 0) {
                    const precioConDescuento = Math.round(producto.precio * (1 - descuento / 100));
                    precioHTML = `
                        <p class="card-text">
                            <span style="color:red; text-decoration: line-through; margin-right:8px;">
                                $${producto.precio.toLocaleString('es-CL')}
                            </span>
                            <span style="color:green; font-weight:bold;">
                                $${precioConDescuento.toLocaleString('es-CL')}
                            </span>
                            <br>
                            <small class="text-success">(${descuento}% dcto aplicado)</small>
                        </p>
                    `;
                }

                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-img-container">
                            <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            ${precioHTML}
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

        if (!productId) {
            return;
        }

        const producto = productos.find(p => p.id === productId);

        if (producto) {
            document.getElementById('product-name').textContent = producto.nombre;
            
            const descuento = obtenerDescuento();
            const precioElement = document.getElementById('product-price');
            let precioHTML = `<strong>$${producto.precio.toLocaleString('es-CL')}</strong>`;

            if (descuento > 0) {
                const precioConDescuento = Math.round(producto.precio * (1 - descuento / 100));
                precioHTML = `
                    <p class="h4">
                        <span style="color:red; text-decoration: line-through; margin-right:8px;">
                            $${producto.precio.toLocaleString('es-CL')}
                        </span>
                        <span style="color:green; font-weight:bold;">
                            $${precioConDescuento.toLocaleString('es-CL')}
                        </span>
                        <br>
                        <small class="text-success">(${descuento}% dcto aplicado)</small>
                    </p>
                `;
            } else {
                precioHTML = `<p class="h4"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>`;
            }
            precioElement.innerHTML = precioHTML;


            document.getElementById('product-description').textContent = producto.descripcion;
            
            const productImage = document.getElementById('product-image');
            if (productImage) {
                productImage.src = `images/${producto.imagen}`;
                productImage.alt = producto.nombre;
            }

            const addToCartBtn = document.getElementById('add-to-cart-btn');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', () => {
                    if (!sessionStorage.getItem('userRole')) {
                        alert('Debes iniciar sesión o registrarte para añadir productos al carro.');
                        window.location.href = 'inicioSesion.html';
                        return;
                    }

                    const cantidadInput = document.getElementById('cantidad');
                    const cantidad = parseInt(cantidadInput.value, 10);
                    if (cantidad > 0) {
                        agregarAlCarro(producto, cantidad);
                    } else {
                        alert('La cantidad debe ser mayor a 0.');
                    }
                });
            }
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
            for (let i = 0; i < 3; i++) {
                const miniaturaDiv = document.createElement('div');
                miniaturaDiv.className = 'product-thumbnail me-2';
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
            const descuento = obtenerDescuento();

            productosRelacionados.forEach(producto => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-3 mb-4';

                let precioHTML = `<p class="card-text"><strong>$${producto.precio.toLocaleString('es-CL')}</strong></p>`;
                if (descuento > 0) {
                    const precioConDescuento = Math.round(producto.precio * (1 - descuento / 100));
                    precioHTML = `
                        <p class="card-text">
                            <span style="color:red; text-decoration: line-through; margin-right:8px;">
                                $${producto.precio.toLocaleString('es-CL')}
                            </span>
                            <span style="color:green; font-weight:bold;">
                                $${precioConDescuento.toLocaleString('es-CL')}
                            </span>
                            <br>
                            <small class="text-success">(${descuento}% dcto aplicado)</small>
                        </p>
                    `;
                }

                productCard.innerHTML = `
                    <div class="card">
                        <div class="card-img-container">
                            <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        </div>
                        <div class="card-body text-center">
                            <h5 class="card-title">${producto.nombre}</h5>
                            ${precioHTML}
                            <a href="detalleProducto.html?id=${producto.id}" class="btn btn-primary">Ver detalle</a>
                        </div>
                    </div>
                `;
                relatedProductsContainer.appendChild(productCard);
            });
        }
    };

    const agregarAlCarro = (producto, cantidad) => {
        let carro = obtenerCarro();
        const itemExistente = carro.find(item => item.id === producto.id);
        const descuento = obtenerDescuento();
        let precioFinal = producto.precio;

        if (descuento > 0) {
            precioFinal = Math.round(producto.precio * (1 - descuento / 100));
        }

        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carro.push({ ...producto, cantidad, precioFinal });
        }
        
        guardarCarro(carro);
        alert(`${cantidad} ${producto.nombre}(s) agregado(s) al carro.`);
    };

    const mostrarCarro = () => {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const couponForm = document.getElementById('coupon-form');
        const pagarBtn = document.getElementById('pagar-btn');

        if (!cartItemsContainer || !cartTotalElement) return;

        let carro = obtenerCarro();
        
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (carro.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center">Tu carro de compras está vacío.</p>';
        } else {
            carro.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'd-flex align-items-center mb-4';
                const precio = item.precioFinal || item.precio;
                const subtotal = precio * item.cantidad;
                total += subtotal;

                itemElement.innerHTML = `
                    <div class="card-img-container me-3" style="width: 150px; height: 150px;">
                        <img src="images/${item.imagen}" alt="${item.nombre}" style="object-fit: contain; width: 100%; height: 100%;">
                    </div>
                    <div class="flex-grow-1">
                        <h4>${item.nombre}</h4>
                        <p class="h5"><strong>$${subtotal.toLocaleString('es-CL')}</strong></p>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-sm btn-outline-secondary me-2 decrease-quantity" data-id="${item.id}">-</button>
                            <span>Cantidad: ${item.cantidad}</span>
                            <button class="btn btn-sm btn-outline-secondary ms-2 increase-quantity" data-id="${item.id}">+</button>
                            <button class="btn btn-sm btn-outline-danger ms-3 remove-item" data-id="${item.id}">Eliminar</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            cartItemsContainer.querySelectorAll('.increase-quantity').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    let carro = obtenerCarro();
                    const item = carro.find(p => p.id === id);
                    if (item) {
                        item.cantidad++;
                        guardarCarro(carro);
                        mostrarCarro();
                    }
                });
            });

            cartItemsContainer.querySelectorAll('.decrease-quantity').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    let carro = obtenerCarro();
                    const item = carro.find(p => p.id === id);
                    if (item && item.cantidad > 1) {
                        item.cantidad--;
                        guardarCarro(carro);
                        mostrarCarro();
                    }
                });
            });

            cartItemsContainer.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const id = e.target.getAttribute('data-id');
                    let carro = obtenerCarro();
                    carro = carro.filter(p => p.id !== id);
                    guardarCarro(carro);
                    mostrarCarro();
                });
            });
        }

        let totalFinal = total;
        const descuentoAplicado = obtenerDescuento();
        
        if (descuentoAplicado > 0) {
            totalFinal = total * (1 - descuentoAplicado / 100);
            cartTotalElement.textContent = `$${totalFinal.toLocaleString('es-CL')}`;
        } else {
            cartTotalElement.textContent = `$${total.toLocaleString('es-CL')}`;
        }

        if (couponForm) {
            couponForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const couponInput = document.getElementById('coupon-input');
                const couponCode = couponInput.value.trim().toUpperCase();

                if (couponCode === 'FELICES50' && !sessionStorage.getItem('descuentoCincuenta') && !sessionStorage.getItem('descuentoFelices50')) {
                    totalFinal = total * 0.90;
                    alert('Cupón aplicado con éxito. ¡Disfruta de tu 10% de descuento!');
                    sessionStorage.setItem('descuentoFelices50', 'true');
                    cartTotalElement.textContent = `$${totalFinal.toLocaleString('es-CL')}`;
                } else if (couponCode === 'FELICES50') {
                    alert('Ya tienes un descuento activo.');
                } else {
                    alert('Cupón inválido.');
                }
            });
        }

        if (pagarBtn) {
            pagarBtn.addEventListener('click', () => {
                if (obtenerCarro().length > 0) {
                    alert('¡Compra realizada con éxito! Gracias por tu preferencia.');
                    sessionStorage.removeItem('carro');
                    sessionStorage.removeItem('descuentoCincuenta');
                    sessionStorage.removeItem('descuentoFelices50');
                    window.location.reload();
                } else {
                    alert('Tu carrito está vacío. Agrega productos para continuar.');
                }
            });
        }
    };
    
    if (window.location.pathname.includes('productos.html')) {
        listarProductos();
    }
    if (window.location.pathname.includes('detalleProducto.html')) {
        mostrarDetalleProducto();
    }
    if (window.location.pathname.includes('carro.html')) {
        const userIsLoggedIn = sessionStorage.getItem('userRole');
        if (!userIsLoggedIn) {
            alert('Debes iniciar sesión para ver tu carrito de compras.');
            window.location.href = 'inicioSesion.html';
            return;
        }
        mostrarCarro();
    }
    
    if (window.location.pathname.includes('sesionIniciada.html') || window.location.pathname.includes('index.html')) {
        const userRole = sessionStorage.getItem('userRole');
        if (userRole) {
            listarProductos();
        }
    }
});