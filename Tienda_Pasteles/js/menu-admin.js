document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');

    if (!userRole) {
        // Redirige al login si no hay un rol de usuario
        window.location.href = 'inicioSesion.html';
        return;
    }

    const menuItems = document.querySelectorAll('#admin-menu li');

    menuItems.forEach(item => {
        const rolesPermitidos = item.dataset.role;
        if (rolesPermitidos) {
            const rolesArray = rolesPermitidos.split(',');
            if (!rolesArray.includes(userRole.toLowerCase())) {
                item.style.display = 'none';
            }
        }
    });
});