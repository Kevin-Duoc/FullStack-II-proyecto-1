import React from 'react';
import { Link } from 'react-router-dom';

const DetalleBlog1 = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Tus Sueños Hechos Torta: El Arte de Nuestras Creaciones Personalizadas</h1>
            <div className="row">
                <div className="col-12 text-center mb-4">
                    <img src="/images/tortapochita.jpg" alt="Torta personalizable" className="img-detalle-noti" />
                </div>
                
                <div className="col-12 ">
                    <h3>¡Transformamos tu idea en el pastel perfecto!</h3>
                    <p>
                        Una celebración especial merece una torta inolvidable. En Pastelería 1000 Sabores, creemos que cada pastel debe ser tan único como la persona que lo festeja. Por eso, nos especializamos en crear tortas personalizadas que no solo son deliciosas, sino que también cuentan una historia: <strong>la tuya</strong>.
                    </p>
                    <h4>De la Imaginación al Paladar</h4>
                    <p>
                        Todo comienza con tu visión. ¿Tienes en mente el personaje favorito de tu hijo, los colores de tu boda o un diseño completamente original que viste en un sueño? ¡Cuéntanoslo! Nuestro equipo de maestros pasteleros trabajará contigo en cada paso para asegurarnos de que el resultado final sea exactamente como lo imaginaste.
                    </p>
                    <h4>Sabor y Calidad en Cada Bocado</h4>
                    <p>
                        De nada sirve una torta hermosa si no es exquisita. Utilizamos solo ingredientes frescos y de la más alta calidad para garantizar un sabor que esté a la altura del diseño. Puedes elegir entre una gran variedad de sabores para el bizcocho, rellenos cremosos y cubiertas que se derriten en tu boca.
                    </p>

                    <h4>Perfectas para Cualquier Ocasión</h4>
                    <p>
                        Nuestras tortas personalizadas son el centro de atención ideal para:
                    </p>
                    <ul>
                        <li>Cumpleaños infantiles y de adultos</li>
                        <li>Bodas y aniversarios</li>
                        <li>Bautizos y baby showers</li>
                        <li>Eventos corporativos</li>
                        <li>¡O simplemente para darte un gusto!</li>
                    </ul>
                    <h4>¿Listo para crear la torta de tus sueños?</h4>
                    <p>
                        No esperes más. Visita nuestra sección de <Link to="/contacto"><strong>Contacto</strong></Link> y cuéntanos tu idea. Te enviaremos una cotización personalizada sin ningún compromiso.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetalleBlog1;