import React from 'react';

const DetalleBlog2 = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Un Momento para tu Paladar: Te Invitamos a Nuestra Gran Degustación Gratuita</h1>
            <div className="row">
                <div className="col-12 text-center mb-4">
                    {/* Usamos la imagen del evento que subiste */}
                    <img src="/images/evento.jpg" alt="Día de la Degustación" className="img-detalle-noti" />
                </div>
                <div className="col-12">
                    <h3>¡Una Oportunidad Única para Endulzar tu Paladar, Totalmente Gratis!</h3>
                    <p>
                        En Pastelería 1000 Sabores estamos increíblemente emocionados y queremos compartir nuestra pasión y dulzura contigo. Por eso, hemos organizado nuestro primer <strong>Día de Degustación Gratuita</strong>, una jornada especial dedicada a que conozcas de primera mano los sabores que nos hacen únicos. ¡Es nuestra forma de agradecer tu preferencia!
                    </p>

                    <h4>¿Qué Podrás Probar?</h4>
                    <ul>
                        <li>Mini porciones de nuestras tortas estrella: Tres Leches, Selva Negra y la aclamada Manjar-Lúcuma.</li>
                        <li>Cupcakes de Red Velvet y Vainilla con nuestro irresistible frosting de queso crema.</li>
                        <li>Nuestras famosas galletas de mantequilla decoradas que tanto gustan.</li>
                        <li><strong>¡Y el debut de un nuevo sabor secreto que lanzaremos exclusivamente ese día!</strong></li>
                    </ul>

                    <h4>La Cita: ¿Cuándo y Dónde?</h4>
                    <p>
                        El evento se realizará este próximo <strong>miércoles 22 de Octubre</strong>. Estaremos esperándote en la <strong>sala LC4 de Duoc UC</strong>. Hemos preparado todo para que sea una experiencia deliciosa en un ambiente estudiantil, grato y cercano.
                    </p>

                    <h4>¡No Faltes a la Cita Más Dulce del Mes!</h4>
                    <p>
                        No necesitas inscripción, ¡solo tu presencia! Pero recuerda que las porciones de degustación son limitadas, así que te recomendamos llegar temprano para no perderte de nada.
                    </p>
                    <p>
                        <strong>¡Te esperamos con la mejor energía y aún más sabor en Duoc UC, sala LC4, este 22 de Octubre!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DetalleBlog2;