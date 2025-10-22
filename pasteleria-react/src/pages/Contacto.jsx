import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        comentario: ''
    });
    //Cargar la sesión del usuario al montar el componente
    useEffect(() => {
        const usuarioActual = JSON.parse(sessionStorage.getItem('usuarioActual'));
        setUsuario(usuarioActual);

        if (usuarioActual) {
            setFormData(prevData => ({
                ...prevData,
                nombre: usuarioActual.nombreCompleto || '',
                correo: usuarioActual.correo || ''
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //Validación de sesión
        if (!usuario) {
            alert('Debe iniciar sesión primero para enviar un mensaje.');
            navigate('/iniciar-sesion');
            return;
        }

        let valid = true;
        //validación de contenido
        if (formData.nombre.length > 100) {
            alert('El nombre no puede exceder los 100 caracteres.');
            valid = false;
        }
        if (formData.correo.length > 100) {
            alert('El correo no puede exceder los 100 caracteres.');
            valid = false;
        }
        const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
        if (!emailRegex.test(formData.correo)) {
            alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            valid = false;
        }
        if (formData.comentario.length > 500) {
            alert('El comentario no puede exceder los 500 caracteres.');
            valid = false;
        }

        if (valid) {
            const nuevoMensaje = {
                nombre: usuario.nombreCompleto,
                correo: usuario.correo,
                mensaje: formData.comentario,
                fecha: new Date().toISOString()
            };

            const mensajes = JSON.parse(sessionStorage.getItem('mensajes') || '[]');
            mensajes.unshift(nuevoMensaje);
            sessionStorage.setItem('mensajes', JSON.stringify(mensajes));
            
            alert('Mensaje enviado con éxito');
            setFormData(prevData => ({
                ...prevData,
                comentario: ''
            }));
        }
    };

    return (
        <div className="container my-5">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">FORMULARIO DE CONTACTO</h2>
                            
                            <form id="contacto-form" onSubmit={handleSubmit} className="row g-3">
                                
                                <div id="user-info-fields" style={{ display: usuario ? 'none' : 'block' }}>
                                    <div className="col-md-12">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" required 
                                               value={formData.nombre} onChange={handleChange} disabled={!!usuario} />
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="correo" className="form-label">Correo</label>
                                        <input type="email" className="form-control" id="correo" required 
                                               value={formData.correo} onChange={handleChange} disabled={!!usuario} />
                                    </div>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="comentario" className="form-label">Comentario</label>
                                    <textarea className="form-control" id="comentario" rows="5" required 
                                              value={formData.comentario} onChange={handleChange}></textarea>
                                </div>
                                
                                <div className="col-12 text-center mt-4">
                                    <button type="submit" className="btn btn-primary">ENVIAR MENSAJE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contacto;