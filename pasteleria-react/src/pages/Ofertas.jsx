import React from 'react';
import { Link } from 'react-router-dom';
// Nota: La lógica para listar productos con descuentos reales se migrará más adelante.

const Ofertas = () => {
  return (
    <div className="container my-5">
      <h1 className='text-center'>PÁGINA: Ofertas Especiales</h1>
      <p className='text-center'>¡Descubre los productos con los mejores descuentos del mes!</p>
      
      <section className="row mt-5">
          {/* Módulo de Ofertas - Aquí se listarán los productos con descuento */}
          <div className="col-md-4 mb-4">
              <div className="card text-center p-3 border-danger">
                  <h4 className='text-danger'>Torta de Manjar</h4>
                  <p>Precio anterior: $42.000</p>
                  <h3 className='text-success'>**¡Ahora $37.800!**</h3>
                  <p className='text-muted'>10% OFF por tiempo limitado</p>
                  <Link to="/productos/TT002" className="btn btn-primary">Ver Oferta</Link>
              </div>
          </div>
          
          <div className="col-md-4 mb-4">
              <div className="card text-center p-3 border-primary">
                  <h4 className='text-primary'>Brownie Sin Gluten</h4>
                  <p>Aprovecha nuestro 2x1 en brownies seleccionados.</p>
                  <h3 className='text-success'>**2 x $4.000**</h3>
                  <Link to="/productos/PG001" className="btn btn-primary">Comprar</Link>
              </div>
          </div>

          <div className="col-md-4 mb-4">
              <div className="card text-center p-3 border-secondary">
                  <h4 className='text-secondary'>Galletas Veganas</h4>
                  <p>Envío gratis en pedidos mayores a $15.000</p>
                  <h3 className='text-success'>**Envío GRATIS**</h3>
                  <Link to="/productos/PV002" className="btn btn-primary">Ver Productos</Link>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Ofertas;