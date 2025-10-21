import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegionesYComunas } from '../data/data';

const AjustesUsuario = () => {
    const navigate = useNavigate();
    const regionesYComunas = getRegionesYComunas();
    
    // 1. Inicialización de estado para el formulario
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        fechaNacimiento: '',
        telefono: '',
        region: '',
        comuna: ''
    });
    const [comunasDisponibles, setComunasDisponibles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 2. Efecto para cargar los datos del usuario logueado (desde sessionStorage)
    useEffect(() => {
        const usuario = JSON.parse(sessionStorage.getItem('usuarioActual'));
        
        if (!usuario) {
            alert("No se encontró la información del usuario. Debes iniciar sesión.");
            navigate('/iniciar-sesion');
            return;
        }

        // Rellenar el estado con los datos del usuario actual
        setFormData({
            nombreCompleto: usuario.nombreCompleto || '',
            correo: usuario.correo || '',
            contrasena: usuario.contrasena || '',
            confirmarContrasena: usuario.contrasena || '',
            fechaNacimiento: usuario.fechaNacimiento || '',
            telefono: usuario.telefono || '',
            region: usuario.region || '',
            comuna: usuario.comuna || ''
        });

        // Cargar las comunas iniciales si hay una región guardada
        if (usuario.region) {
            setComunasDisponibles(regionesYComunas[usuario.region] || []);
        }

        setIsLoaded(true);
    }, [navigate]); // Dependencias del efecto

    // 3. Manejo de cambios en los inputs del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));

        // Lógica para actualizar comunas al cambiar la región
        if (id === 'region') {
            const nuevasComunas = regionesYComunas[value] || [];
            setComunasDisponibles(nuevasComunas);
            // Si la región cambia, se resetea la comuna
            setFormData(prevData => ({
                ...prevData,
                comuna: nuevasComunas.length > 0 ? prevData.comuna : ''
            }));
        }
    };

    // 4. Manejo del envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.contrasena !== formData.confirmarContrasena) {
            alert("La contraseña y la confirmación no coinciden.");
            return;
        }
        if (formData.contrasena.length < 4 || formData.contrasena.length > 10) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }

        // Simulación de guardado de datos
        // NOTA: En React, actualizas la sesión usando el estado actualizado (formData)
        sessionStorage.setItem("usuarioActual", JSON.stringify(formData));
        
        // Simular la actualización del listado de usuarios (como hacía tu app-admin.js)
        const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
        const index = usuariosSession.findIndex(u => u.correo === formData.correo);
        if (index !== -1) {
            usuariosSession[index] = formData;
            sessionStorage.setItem("usuarios", JSON.stringify(usuariosSession));
        }

        alert("¡Datos actualizados con éxito!");
        window.dispatchEvent(new Event('storageChange'));
        navigate("/");
    };

    if (!isLoaded) {
        return <h1 className='text-center my-5'>Verificando sesión...</h1>;
    }

    return (
        <div className="container my-5">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Actualizar Datos de Usuario</h2>
                            
                            {/* FORMULARIO DE AJUSTES */}
                            <form id="ajustes-form" className="row g-3" onSubmit={handleSubmit}>
                                
                                <div className="col-md-12">
                                    <label htmlFor="nombreCompleto" className="form-label">NOMBRE COMPLETO</label>
                                    <input type="text" className="form-control" id="nombreCompleto" required 
                                           value={formData.nombreCompleto} onChange={handleChange} />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="correo" className="form-label">CORREO</label>
                                    {/* El correo es el identificador, por lo que se mantiene deshabilitado */}
                                    <input type="email" className="form-control" id="correo" disabled 
                                           value={formData.correo} />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="contrasena" className="form-label">CONTRASEÑA</label>
                                    <input type="password" className="form-control" id="contrasena" required 
                                           value={formData.contrasena} onChange={handleChange} />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="confirmarContrasena" className="form-label">CONFIRMAR CONTRASEÑA</label>
                                    <input type="password" className="form-control" id="confirmarContrasena" required 
                                           value={formData.confirmarContrasena} onChange={handleChange} />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="fechaNacimiento" className="form-label">FECHA DE NACIMIENTO</label>
                                    {/* Lo deshabilitamos si ya está, ya que la lógica de descuento por edad depende de esto. */}
                                    <input type="date" className="form-control" id="fechaNacimiento" disabled={!!formData.fechaNacimiento}
                                           value={formData.fechaNacimiento} onChange={handleChange} required />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="telefono" className="form-label">TELÉFONO (opcional)</label>
                                    <input type="tel" className="form-control" id="telefono" 
                                           value={formData.telefono} onChange={handleChange} />
                                </div>
                                
                                {/* SELECTS DE REGIONES Y COMUNAS */}
                                <div className="col-md-6">
                                    <label htmlFor="region" className="form-label">Seleccione la región</label>
                                    <select className="form-select" id="region" required value={formData.region} onChange={handleChange}>
                                        <option disabled value="">- Seleccione una región -</option>
                                        {Object.keys(regionesYComunas).map(regionKey => (
                                            <option key={regionKey} value={regionKey}>{regionKey}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="col-md-6">
                                    <label htmlFor="comuna" className="form-label">Seleccione una comuna</label>
                                    <select className="form-select" id="comuna" required 
                                            value={formData.comuna} onChange={handleChange} disabled={comunasDisponibles.length === 0}>
                                        <option disabled value="">- Seleccione una comuna -</option>
                                        {comunasDisponibles.map(comuna => (
                                            <option key={comuna} value={comuna}>{comuna}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="col-12 text-center mt-4">
                                    <button type="submit" className="btn btn-primary">GUARDAR CAMBIOS</button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AjustesUsuario;