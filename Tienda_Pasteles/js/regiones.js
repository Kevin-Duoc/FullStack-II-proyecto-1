document.addEventListener('DOMContentLoaded', () => {
    const regionesYComunas = {
        Metropolitana: ['Santiago', 'Providencia', 'Las Condes', 'Maipú'],
        Valparaiso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
        Biobio: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante'],
        Coquimbo: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel']
    };

    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    if (regionSelect && comunaSelect) {
        // Llenar el select de regiones
        for (const region in regionesYComunas) {
            const option = document.createElement('option');
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        }

        // Manejar el cambio de región para llenar las comunas
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
});