# 🍰 Pastelería 1000 Sabores

Proyecto de página web simple para la asignatura de FullStack II (FrontEnd) 
El sitio corresponde a la **Pastelería 1000 Sabores**, donde los usuarios pueden navegar entre el catalogo de los productos que la tienda ofrece, adquirirlos al carrito y realizar el pedido, del mismo modo, registrar una cuenta de usuario. Tambien dispone de otras funciones, como el blog de articulos o publicaciones, y un formulario para consultas, sugerencias o reclamos.

---

## 📂 Estructura del proyecto

- **index.html** → Página principal (Home).  
- **productos.html** → Listado de productos disponibles.  
- **nosotros.html** → Información sobre la pastelería.  
- **blogs.html** → Sección de artículos o publicaciones.  
- **contacto.html** → Página de contacto.  
- **registro.html** → Formulario de registro de usuario.  
- **inicioSesion.html** → Página para iniciar sesión.  
- **sesionIniciada.html** → Página de bienvenida al usuario después del registro/inicio de sesión.  
- **carro.html** → Carrito de compras.  
- **css/style.css** → Estilos personalizados.  
- **js/app.js~validaciones.js** → Validaciones y lógica en JavaScript.  

---

## 🛠️ Tecnologías utilizadas

- **HTML5** → Estructura del sitio.  
- **CSS3** + **Bootstrap 5** → Estilos y diseño responsivo.  
- **JavaScript** → Validaciones y carga dinámica de comunas según región.  

---

## 🚀 Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.  
2. Abrir el archivo `index.html` en el navegador.  
   - Recomendado: usar **Live Server** de VS Code para una mejor experiencia.  

---

## 📋 Funcionalidades principales

- **Registro de usuario** con los campos:
  - Nombre completo
  - Correo
  - Contraseña y confirmación
  - Teléfono (opcional)
  - Región y comuna (se cargan dinámicamente según la región seleccionada)

- **Navegación completa** por menú con acceso a todas las páginas.  
- **Carrito de compras.**  
- **Validaciones básicas** en JavaScript.  

---

## ⚠️ Nota importante

Este es un proyecto **estático** (solo HTML, CSS y JS).  
No tiene un backend (PHP, Node.js, etc.), por lo que:
- El formulario de registro **no guarda datos en una base de datos**.  
- Para simular el flujo de registro, el botón **REGISTRAR** redirige a `sesionIniciada.html`.  

---

## 👨‍💻 Autores

- Proyecto desarrollado en el marco del curso de **FullStack II**.
- Profesor a cargo: *Hernan Saavedra*  
- Integrantes: *Esther Orellana y Kevin Fuenzalida*.  
