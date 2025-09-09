// layout.js

document.addEventListener('DOMContentLoaded', () => {
    const userRole = sessionStorage.getItem('userRole');
    const userEmail = sessionStorage.getItem('userEmail');
    const navRight = document.getElementById('nav-right');
    const cartCountElement = document.getElementById('cart-count');

    const actualizarContadorCarro = () => {
        const carro = JSON.parse(sessionStorage.getItem('carro') || '[]');
        const contador = carro.reduce((total, item) => total + item.cantidad, 0);
        if (cartCountElement) {
            cartCountElement.textContent = `Carro (${contador})`;
        }
    };

    if (userRole) {
        navRight.innerHTML = `
            <ul class="navbar-nav me-2">
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">¡Hola, ${userEmail.split('@')[0]}!</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link-personalizado" href="#" id="logout-btn">Cerrar sesión</a>
                </li>
            </ul>
            <a class="nav-link" href="carro.html">
                <i class="material-icons">shopping_cart</i> <span id="cart-count">Carro (0)</span>
            </a>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    } else {
        navRight.innerHTML = `
            <ul class="navbar-nav me-2">
                <li class="nav-item">
                    <a class="nav-link-personalizado" href="inicioSesion.html">Iniciar sesión</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link-personalizado" href="registro.html">Registrarse</a>
                </li>
            </ul>
            <a class="nav-link" href="carro.html">
                <i class="material-icons">shopping_cart</i> <span id="cart-count">Carro (0)</span>
            </a>
        `;
    }

    window.addEventListener('carroActualizado', actualizarContadorCarro);
    actualizarContadorCarro();
});