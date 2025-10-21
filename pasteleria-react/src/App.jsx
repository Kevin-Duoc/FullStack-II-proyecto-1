import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Importamos todas las páginas
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import RegistroUsuario from './pages/RegistroUsuario';
import IniciarSesion from './pages/IniciarSesion';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';
import Carro from './pages/Carro';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import PedidosCliente from './pages/PedidosCliente'; 
import AjustesUsuario from './pages/AjustesUsuario';

import AdminLayout from './components/admin/AdminLayout';
import AdminHome from './pages/admin/AdminHome';
import AdminProductos from './pages/admin/AdminProductos';
import AdminPedidos from './pages/admin/AdminPedidos';
import AdminNuevoProducto from './pages/admin/AdminNuevoProducto';

import DetalleBlog1 from './pages/DetalleBlog1';
import DetalleBlog2 from './pages/DetalleBlog2';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          {/* Rutas Públicas (Tienda) */}
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} /> 
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carro" element={<Carro />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/pedidos" element={<PedidosCliente />} />
          <Route path="/ajustes" element={<AjustesUsuario />} />

          {/* RUTAS DE DETALLE DE BLOGS (NUEVO) */}
          <Route path="/blogs/detalle/1" element={<DetalleBlog1 />} /> 
          <Route path="/blogs/detalle/2" element={<DetalleBlog2 />} /> 
          <Route path="/contacto" element={<Contacto />} />

          {/* Rutas del Cliente Logueado */}
          <Route path="/ajustes" element={<AjustesUsuario />} />
          <Route path="/pedidos" element={<PedidosCliente />} />

          {/* Rutas del Administrador (Dashboard) - Usan AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
             <Route index element={<AdminHome />} /> 
             <Route path="productos" element={<AdminProductos />} />
             <Route path='nuevo-producto' element={<AdminNuevoProducto/>} />
             <Route path="pedidos" element={<AdminPedidos />} />
             {/* Agrega aquí las rutas faltantes (inventario, clientes, empleados, reportes) */}
             <Route path="inventario" element={<h3 className='text-center'>PÁGINA: Inventario</h3>} />
             <Route path="clientes" element={<h3 className='text-center'>PÁGINA: Clientes</h3>} />
             <Route path="empleados" element={<h3 className='text-center'>PÁGINA: Empleados</h3>} />
             <Route path="reportes" element={<h3 className='text-center'>PÁGINA: Reportes</h3>} />
          </Route>
          
          {/* Ruta Catch-all (404) */}
          <Route path="*" element={<h1 className='text-center my-5'>404 | Página no encontrada</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;