// 1. Productos (con stock y stockCritico para el Admin)
export const productos = [
    { id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.', precio: 45000, imagen: 'torta_cuadrada_chocolate.jpg', stock: 15, stockCritico: 5 },
    { id: 'TC002', nombre: 'Torta Cuadrada de Frutas', descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla.', precio: 50000, imagen: 'torta_cuadrada_frutas.jpg', stock: 8, stockCritico: 5 },
    { id: 'TT001', nombre: 'Torta Circular de Vainilla', descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera.', precio: 40000, imagen: 'torta_circular_vainilla.jpg', stock: 20, stockCritico: 10 },
    { id: 'TT002', nombre: 'Torta Circular de Manjar', descripcion: 'Torta tradicional chilena con manjar y nueces.', precio: 42000, imagen: 'torta_circular_manjar.jpg', stock: 3, stockCritico: 5 },
    { id: 'PI001', nombre: 'Mousse de Chocolate', descripcion: 'Postre individual cremoso y suave, ideal para los amantes del chocolate.', precio: 5000, imagen: 'mousse_chocolate.jpg', stock: 50, stockCritico: 20 },
    { id: 'PI002', nombre: 'Tiramisú Clásico', descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao.', precio: 5500, imagen: 'tiramisu_clasico.jpg', stock: 10, stockCritico: 5 },
    { id: 'PSA001', nombre: 'Torta Sin Azúcar de Naranja', descripcion: 'Torta ligera y deliciosa, endulzada naturalmente.', precio: 48000, imagen: 'torta_sin_azucar_naranja.jpg', stock: 12, stockCritico: 5 },
    { id: 'PSA002', nombre: 'Cheesecake Sin Azúcar', descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.', precio: 47000, imagen: 'cheesecake_sin_azucar.jpg', stock: 1, stockCritico: 3 },
    { id: 'PT001', nombre: 'Empanada de Manzana', descripcion: 'Pastelería tradicional rellena de manzanas especiadas.', precio: 3000, imagen: 'empanada_manzana.jpg', stock: 100, stockCritico: 50 },
    { id: 'PT002', nombre: 'Tarta de Santiago', descripcion: 'Tradicional tarta española hecha con almendras.', precio: 6000, imagen: 'tarta_santiago.jpg', stock: 25, stockCritico: 10 },
    { id: 'PG001', nombre: 'Brownie Sin Gluten', descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten.', precio: 4000, imagen: 'brownie_sin_gluten.jpg', stock: 8, stockCritico: 5 },
    { id: 'PV001', nombre: 'Torta Vegana de Chocolate', descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal.', precio: 50000, imagen: 'torta_vegana_chocolate.jpg', stock: 7, stockCritico: 5 },
    { id: 'TE001', nombre: 'Torta Especial de Cumpleaños', descripcion: 'Diseñada especialmente para celebraciones, personalizable con mensajes únicos.', precio: 55000, imagen: 'torta_especial_cumpleanos.jpg', stock: 6, stockCritico: 5 },
    { id: 'TE002', nombre: 'Torta Especial de Boda', descripcion: 'Elegante y deliciosa, centro de atención en cualquier boda.', precio: 60000, imagen: 'torta_especial_boda.jpg', stock: 0, stockCritico: 1 },
];

// 2. Usuarios fijos y sus roles (para login y permisos)
export const usuariosFijos = [
    { nombreCompleto: 'Admin Pastelero', correo: 'admin@duoc.cl', contrasena: '12345', rol: 'administrador', fechaNacimiento: '1980-01-01', telefono: '987654321', region: 'Metropolitana', comuna: 'Santiago' },
    { nombreCompleto: 'Vendedor Duoc', correo: 'vendedor@duoc.cl', contrasena: '12345', rol: 'vendedor', fechaNacimiento: '1990-01-01', telefono: '912345678', region: 'Valparaiso', comuna: 'Viña del Mar' },
    { nombreCompleto: 'Cliente Feliz', correo: 'cliente@gmail.com', contrasena: '12345', rol: 'cliente', fechaNacimiento: '1995-01-01', telefono: '998765432', region: 'Biobio', comuna: 'Concepción' },
];

// 3. Regiones y Comunas
export const regionesYComunas = {
    Metropolitana: ['Santiago', 'Providencia', 'Las Condes', 'Maipú'],
    Valparaiso: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'],
    Biobio: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Chiguayante'],
    Coquimbo: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel']
};

// 4. Funciones getter
export const getProductos = () => productos;
export const getUsuariosFijos = () => usuariosFijos;
export const getRegionesYComunas = () => regionesYComunas;

//5. Funciones CRUD
export const agregarProducto = (nuevoProducto) => {
    productos.push(nuevoProducto);
}

export const actualizarProducto = (id, datosActualizados) => {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
  }
};

export const eliminarProducto = (id) => {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos.splice(index, 1);
  }
};