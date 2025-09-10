// js/ajusteusuario.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ajustes-form");
    const nombreInput = document.getElementById("nombreCompleto");
    const correoInput = document.getElementById("correo");
    const contrasenaInput = document.getElementById("contrasena");
    const confirmarContrasenaInput = document.getElementById("confirmarContrasena");
    const fechaNacimientoInput = document.getElementById("fechaNacimiento");
    const telefonoInput = document.getElementById("telefono");
    const regionSelect = document.getElementById("region");
    const comunaSelect = document.getElementById("comuna");

    let usuarioActual = JSON.parse(sessionStorage.getItem("usuarioActual"));
    
    if (!usuarioActual) {
        alert("No se encontró la información del usuario.");
        window.location.href = 'inicioSesion.html';
        return;
    }

    nombreInput.value = usuarioActual.nombreCompleto || '';
    correoInput.value = usuarioActual.correo || '';
    contrasenaInput.value = usuarioActual.contrasena || '';
    confirmarContrasenaInput.value = usuarioActual.contrasena || '';
    fechaNacimientoInput.value = usuarioActual.fechaNacimiento || '';
    telefonoInput.value = usuarioActual.telefono || '';
    
    const regionesYComunas = {
        Metropolitana: ['Santiago', 'Providencia', 'Las Condes', 'Maipú'],
        Valparaiso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
        Biobio: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante'],
        Coquimbo: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel']
    };
    
    if (regionSelect && comunaSelect) {
        for (const region in regionesYComunas) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        }
        
        if (usuarioActual.region) {
            regionSelect.value = usuarioActual.region;
            const comunas = regionesYComunas[usuarioActual.region] || [];
            comunaSelect.innerHTML = '<option selected disabled value="">- Seleccione una comuna -</option>';
            comunas.forEach(comuna => {
                const option = document.createElement('option');
                option.value = comuna;
                option.textContent = comuna;
                comunaSelect.appendChild(option);
            });
            comunaSelect.disabled = false;
            if (usuarioActual.comuna) {
                comunaSelect.value = usuarioActual.comuna;
            }
        }
        
        regionSelect.addEventListener('change', (event) => {
            const regionSeleccionada = event.target.value;
            const comunas = regionesYComunas[regionSeleccionada] || [];
            comunaSelect.innerHTML = '<option selected disabled value="">- Seleccione una comuna -</option>';
            comunaSelect.disabled = true;
            if (comunas.length > 0) {
                comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            }
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (contrasenaInput.value !== confirmarContrasenaInput.value) {
            alert("La contraseña y la confirmación no coinciden.");
            return;
        }
        if (contrasenaInput.value.length < 4 || contrasenaInput.value.length > 10) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        usuarioActual.nombreCompleto = nombreInput.value.trim();
        usuarioActual.contrasena = contrasenaInput.value.trim();
        usuarioActual.telefono = telefonoInput.value.trim();
        usuarioActual.region = regionSelect.value;
        usuarioActual.comuna = comunaSelect.value;
        
        sessionStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));

        const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios')) || [];
        const index = usuariosSession.findIndex(u => u.correo === usuarioActual.correo);
        if (index !== -1) {
            usuariosSession[index] = usuarioActual;
            sessionStorage.setItem("usuarios", JSON.stringify(usuariosSession));
        }

        alert("¡Datos actualizados con éxito!");
        window.location.href = "sesionIniciada.html";
    });
});