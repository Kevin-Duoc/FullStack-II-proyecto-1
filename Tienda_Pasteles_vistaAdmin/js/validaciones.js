// js/validaciones.js
document.addEventListener('DOMContentLoaded', () => {

    // Arreglo de usuarios fijos para simular la base de datos
    const usuariosFijos = [
        { correo: 'admin@duoc.cl', contrasena: '12345', rol: 'administrador' },
        { correo: 'vendedor@duoc.cl', contrasena: '12345', rol: 'vendedor' },
        { correo: 'cliente@gmail.com', contrasena: '12345', rol: 'cliente' }
    ];

    // --- Lógica del formulario de inicio de sesión ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const correoInput = document.getElementById('correo');
            const contrasenaInput = document.getElementById('contrasena');
            const correo = correoInput.value.trim();
            const contrasena = contrasenaInput.value.trim();

            let valid = true;

            // Validaciones de formato y longitud
            if (correo.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
            if (!emailRegex.test(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }
            if (contrasena.length < 4 || contrasena.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                valid = false;
            }

            if (valid) {
                // Traemos los usuarios guardados en localStorage
                const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
                // Combinamos usuarios fijos y guardados
                const todosUsuarios = [...usuariosFijos, ...usuariosGuardados];

                // Buscar al usuario
                const usuario = todosUsuarios.find(u => u.correo === correo && u.contrasena === contrasena);
                
                if (usuario) {
                    sessionStorage.setItem('userRole', usuario.rol);
                    sessionStorage.setItem('userEmail', usuario.correo);
                    alert(`¡Bienvenido(a), ${usuario.correo}!`);
                    
                    if (usuario.rol === 'administrador' || usuario.rol === 'vendedor') {
                        window.location.href = 'home-admin.html';
                    } else if (usuario.rol === 'cliente') {
                        window.location.href = 'sesionIniciada.html';
                    }
                } else {
                    alert('Correo o contraseña incorrectos.');
                }
            }
        });
    }

    // --- Lógica del formulario de registro ---
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value.trim();
            const confirmarContrasena = document.getElementById('confirmarContrasena').value.trim();
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const codigoDescuento = document.getElementById('codigoDescuento').value.trim().toUpperCase();

            let valid = true;
            let mensajeAdicional = '';

            // Validaciones
            if (nombreCompleto.length > 100) {
                alert('El nombre completo no puede exceder los 100 caracteres.');
                valid = false;
            }
            if (correo.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
            if (!emailRegex.test(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }
            if (contrasena.length < 4 || contrasena.length > 10) {
                alert('La contraseña debe tener entre 4 y 10 caracteres.');
                valid = false;
            }
            if (contrasena !== confirmarContrasena) {
                alert('La contraseña y la confirmación no coinciden.');
                valid = false;
            }
            
            // Si las validaciones básicas fallan, no continuar
            if (!valid) {
                return;
            }
            
            // Prevenir duplicación de correos
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            const todosUsuarios = [...usuariosFijos, ...usuariosGuardados];
            if (todosUsuarios.some(u => u.correo === correo)) {
                alert('Este correo ya está registrado.');
                return;
            }

            // Asignación de rol por defecto
            let rolAsignado = 'cliente';
            if (correo.endsWith('@duoc.cl') || correo.endsWith('@profesor.duoc.cl')) {
                rolAsignado = 'administrador';
                mensajeAdicional += '¡Por ser parte de Duoc, has sido registrado como administrador! ';
            }

            // Aplicación de reglas de negocio
            if (fechaNacimiento) {
                const birthDate = new Date(fechaNacimiento);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                if (age >= 50) {
                    sessionStorage.setItem('descuentoCincuenta', 'true');
                    mensajeAdicional += '¡Felicidades! Has recibido un descuento del 50% en todos tus productos por ser mayor de 50 años. ';
                }
            }

            if (codigoDescuento === 'FELICES50') {
                if (!sessionStorage.getItem('descuentoCincuenta')) {
                    sessionStorage.setItem('descuentoFelices50', 'true');
                    mensajeAdicional += 'Se ha activado tu descuento de por vida del 10% con el código "FELICES50". ';
                } else {
                    mensajeAdicional += 'Ya tienes un descuento del 50% aplicado, por lo que el cupón no es necesario. ';
                }
            }
            
            // Guardar el nuevo usuario
            usuariosGuardados.push({ nombreCompleto, correo, contrasena, rol: rolAsignado });
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

            sessionStorage.setItem('userRole', rolAsignado);
            sessionStorage.setItem('userEmail', correo);
            
            alert(`¡Registro exitoso! ${mensajeAdicional}`);
            
            // Redirigir según el rol
            if (rolAsignado === 'administrador' || rolAsignado === 'vendedor') {
                window.location.href = 'home-admin.html';
            } else {
                window.location.href = 'sesionIniciada.html';
            }
        });
    }

    // --- Lógica del formulario de contacto ---
    const contactoForm = document.getElementById('contacto-form');
    if (contactoForm) {
        contactoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const userIsLoggedIn = sessionStorage.getItem('userRole');

            if (!userIsLoggedIn) {
                alert('Debes iniciar sesión para enviar un mensaje.');
                window.location.href = 'inicioSesion.html';
                return;
            }
            
            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const comentario = document.getElementById('comentario').value.trim();

            let valid = true;
            if (nombre.length > 100) {
                alert('El nombre no puede exceder los 100 caracteres.');
                valid = false;
            }
            if (correo.length > 100) {
                alert('El correo no puede exceder los 100 caracteres.');
                valid = false;
            }
            const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
            if (!emailRegex.test(correo)) {
                alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                valid = false;
            }
            if (comentario.length > 500) {
                alert('El comentario no puede exceder los 500 caracteres.');
                valid = false;
            }

            if (valid) {
                alert('Mensaje enviado con éxito.');
                contactoForm.reset();
            }
        });
    }
});