// js/layout.js

document.addEventListener('DOMContentLoaded', () => {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
    const navRight = document.getElementById('nav-right');
    const cartCountElement = document.getElementById('cart-count');

    const actualizarContadorCarro = () => {
        const carro = JSON.parse(sessionStorage.getItem('carro') || '[]');
        const contador = carro.reduce((total, item) => total + item.cantidad, 0);
        if (cartCountElement) {
            cartCountElement.textContent = `Carro (${contador})`;
        }
    };

    if (usuarioActual) {
        let adminLink = '';
        if (usuarioActual.rol === 'administrador') {
            adminLink = `<li class="nav-item me-2"><a class="nav-link-personalizado" href="home-admin.html">Panel Admin</a></li>`;
        }
        
        navRight.innerHTML = `
            <div class="d-flex align-items-center">
                <ul class="navbar-nav me-2">
                    ${adminLink}
                    <li class="nav-item dropdown">
                        <button class="nav-link-personalizado dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ¡Hola, ${usuarioActual.nombreCompleto || 'Usuario'}!
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="ajusteusuario.html">Actualizar datos</a></li>
                            <li><a class="dropdown-item" href="pedidos-cliente.html">Ver pedidos</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" id="logout-btn">Cerrar sesión</a></li>
                        </ul>
                    </li>
                </ul>
                <a class="nav-link" href="carro.html">
                    <i class="material-icons">shopping_cart</i> <span id="cart-count">Carro (0)</span>
                </a>
            </div>
        `;

        document.getElementById('logout-btn').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    } else {
        navRight.innerHTML = `
            <div class="d-flex align-items-center">
                <ul class="navbar-nav me-2">
                    <li class="nav-item me-2">
                        <a class="nav-link-personalizado" href="inicioSesion.html">Iniciar sesión</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link-personalizado" href="registro.html">Registrarse</a>
                    </li>
                </ul>
                <a class="nav-link" href="carro.html">
                    <i class="material-icons">shopping_cart</i> <span id="cart-count">Carro (0)</span>
                </a>
            </div>
        `;
    }

    window.addEventListener('carroActualizado', actualizarContadorCarro);
    actualizarContadorCarro();
});