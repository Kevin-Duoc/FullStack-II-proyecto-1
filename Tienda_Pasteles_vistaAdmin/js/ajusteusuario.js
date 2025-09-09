document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ajustes-form");
    const nombreInput = document.getElementById("nombreCompleto");

    // 1. Cargar los datos existentes del usuario desde sessionStorage
    // Usamos || '{}' como fallback por si no hay nada guardado
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

    // 2. Rellenar el campo del formulario con el nombre actual del usuario
    if (userData.nombreCompleto) {
        nombreInput.value = userData.nombreCompleto;
    }

    // 3. Escuchar el evento de envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 4. Actualizar solo el nombre en el objeto de datos del usuario
        userData.nombreCompleto = nombreInput.value;

        // 5. Guardar el objeto completo (con el nombre ya actualizado) de vuelta en sessionStorage
        sessionStorage.setItem("userData", JSON.stringify(userData));
        
        // Opcional: Mostrar un mensaje de éxito
        alert("¡Nombre actualizado con éxito!");

        // 6. Redirigir a la página principal de sesión iniciada
        window.location.href = "sesioniniciada.html";
    });
});