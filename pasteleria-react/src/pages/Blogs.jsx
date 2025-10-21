import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">NOTICIAS IMPORTANTES</h1>
            <section className="row">
                {/* Noticia 1: Tortas Personalizables */}
                <div className="col-md-6 mb-4">
                    <div className="card p-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="card-img-container">
                                    <img src="/images/tortapochita.jpg" alt="Torta personalizable" className="card-image" />
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="text-center mb-4">¡¡Tortas Personalizables!!</h3>
                                    <p className="card-text">¿Tienes alguna idea en mente? ¡¡Puedes hacerla realidad!! cotiza con nosotros tortas personalizables</p>
                                    <Link to="/blogs/detalle/1" className="btn btn-primary">VER NOTICIA</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Noticia 2: Día de la Degustación */}
                <div className="col-md-6 mb-4">
                    <div className="card p-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <div className="card-img-container">
                                    {/* Usamos una imagen genérica para el evento */}
                                    <img src="/images/evento.jpg" alt="Día de la Degustación" className="card-image" /> 
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h3 className="text-center mb-4">¡¡Día de la Degustación!!</h3>
                                    <p className="card-text">¡¡No te lo pierdas!! Ven a conocernos nuestros sabores este 10 de Septiembre en Duoc UC sala LC4.</p>
                                    <Link to="/blogs/detalle/2" className="btn btn-primary">VER NOTICIA</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;