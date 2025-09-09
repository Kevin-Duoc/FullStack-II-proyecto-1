// js/validaciones.js
document.addEventListener('DOMContentLoaded', () => {

    const usuariosFijos = [
        { nombreCompleto: 'Admin Pastelero', correo: 'admin@duoc.cl', contrasena: '12345', rol: 'administrador', fechaNacimiento: '1980-01-01', telefono: '', region: '', comuna: '' },
        { nombreCompleto: 'Vendedor Duoc', correo: 'vendedor@duoc.cl', contrasena: '12345', rol: 'vendedor', fechaNacimiento: '1990-01-01', telefono: '', region: '', comuna: '' },
        { nombreCompleto: 'Cliente Feliz', correo: 'cliente@gmail.com', contrasena: '12345', rol: 'cliente', fechaNacimiento: '1995-01-01', telefono: '', region: '', comuna: '' }
    ];

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value.trim();

            let valid = true;
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
                const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios')) || [];
                const todosUsuarios = [...usuariosFijos, ...usuariosSession];
                const usuario = todosUsuarios.find(u => u.correo === correo && u.contrasena === contrasena);
                
                if (usuario) {
                    sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
                    
                    if (usuario.rol === 'administrador' || usuario.rol === 'vendedor') {
                        alert(`¡Bienvenido(a), ${usuario.nombreCompleto}! Redirigiendo al panel de administración...`);
                        window.location.href = 'home-admin.html';
                    } else if (usuario.rol === 'cliente') {
                        alert(`¡Bienvenido(a), ${usuario.nombreCompleto}!`);
                        window.location.href = 'sesionIniciada.html';
                    }
                } else {
                    alert('Correo o contraseña incorrectos.');
                }
            }
        });
    }

    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value.trim();
            const confirmarContrasena = document.getElementById('confirmarContrasena').value.trim();
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const telefono = document.getElementById('telefono').value.trim();
            const region = document.getElementById('region').value;
            const comuna = document.getElementById('comuna').value;
            const codigoDescuento = document.getElementById('codigoDescuento')?.value.trim().toUpperCase() || '';

            let valid = true;
            let mensajeAdicional = '';

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
            
            if (!valid) {
                return;
            }
            
            const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios')) || [];
            const todosUsuarios = [...usuariosFijos, ...usuariosSession];
            if (todosUsuarios.some(u => u.correo === correo)) {
                alert('Este correo ya está registrado en la sesión actual.');
                return;
            }

            let rolAsignado = 'cliente';
            if (correo.endsWith('@duoc.cl') || correo.endsWith('@profesor.duoc.cl')) {
                rolAsignado = 'administrador';
                mensajeAdicional += '¡Por ser parte de Duoc, has sido registrado como administrador! ';
            }

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
            
            const nuevoUsuario = {
                nombreCompleto,
                correo,
                contrasena,
                rol: rolAsignado,
                fechaNacimiento,
                telefono,
                region,
                comuna
            };
            
            usuariosSession.push(nuevoUsuario);
            sessionStorage.setItem('usuarios', JSON.stringify(usuariosSession));

            sessionStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            
            alert(`¡Registro exitoso! ${mensajeAdicional}`);
            
            if (rolAsignado === 'administrador' || rolAsignado === 'vendedor') {
                window.location.href = 'home-admin.html';
            } else {
                window.location.href = 'sesionIniciada.html';
            }
        });
    }
});