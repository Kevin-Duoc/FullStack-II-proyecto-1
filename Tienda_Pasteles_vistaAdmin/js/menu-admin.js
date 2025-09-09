// js/menu-admin.js

document.addEventListener('DOMContentLoaded', () => {
    const userRole = sessionStorage.getItem('userRole');

    if (!userRole || (userRole !== 'administrador' && userRole !== 'vendedor')) {
        alert('Acceso denegado. No tienes permisos para ver esta página.');
        window.location.href = 'index.html';
        return;
    }
    
    // Oculta los elementos de menú según el rol
    const menuItems = document.querySelectorAll('#admin-menu li[data-role]');
    menuItems.forEach(item => {
        const rolesPermitidos = item.getAttribute('data-role');
        if (rolesPermitidos) {
            const rolesArray = rolesPermitidos.split(',');
            if (!rolesArray.includes(userRole)) {
                item.style.display = 'none';
            }
        }
    });

    // Agrega el evento para cerrar sesión
    const logoutBtn = document.getElementById('logout-admin-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }
    
    // Agrega el evento para el botón "Ver Tienda"
    const verTiendaBtn = document.getElementById('ver-tienda-btn');
    if (verTiendaBtn) {
        verTiendaBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});