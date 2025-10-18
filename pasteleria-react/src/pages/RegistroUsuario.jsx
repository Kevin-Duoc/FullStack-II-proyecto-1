import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRegionesYComunas, getUsuariosFijos } from '../data/data';

const RegistroUsuario = () => {
    const navigate = useNavigate();
    const regionesYComunas = getRegionesYComunas();

    const [formData, setFormData] = useState({
        nombreCompleto: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        fechaNacimiento: '',
        telefono: '',
        region: '',
        comuna: '',
        codigoDescuento: ''
    });
    const [comunasDisponibles, setComunasDisponibles] = useState([]);
    
    // Función central para manejar los cambios en el formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));

        if (id === 'region') {
            const nuevasComunas = regionesYComunas[value] || [];
            setComunasDisponibles(nuevasComunas);
            setFormData(prevData => ({
                ...prevData,
                comuna: ''
            }));
        }
    };
    
    const calcularEdad = (fecha) => {
        const diff_ms = Date.now() - new Date(fecha).getTime();
        const age_dt = new Date(diff_ms); 
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // VALIDACIONES BÁSICAS
        if (formData.contrasena !== formData.confirmarContrasena) {
            alert('La contraseña y la confirmación no coinciden.');
            return;
        }
        if (formData.contrasena.length < 4 || formData.contrasena.length > 10) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            return;
        }
        const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
        if (!emailRegex.test(formData.correo)) {
            alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            return;
        }

        // COMPROBAR DUPLICADOS
        const usuariosFijos = getUsuariosFijos();
        const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
        const todosUsuarios = [...usuariosFijos, ...usuariosSession];
        if (todosUsuarios.some(u => u.correo === formData.correo)) {
            alert('Este correo ya está registrado.');
            return;
        }

        // --- LÓGICA DE ROLES Y DESCUENTOS CORREGIDA ---
        let rolAsignado = 'cliente';
        let mensajeDescuento = '';
        
        // 1. Descuento por correo Duoc (NO asigna rol de admin)
        if (formData.correo.endsWith('@duoc.cl') || formData.correo.endsWith('@profesor.duoc.cl')) {
            // Aplicamos descuento solo por el correo, el rol sigue siendo cliente
            sessionStorage.setItem('descuentoDuoc', 'true'); 
            mensajeDescuento += '¡Felicidades! Por ser de Duoc UC, tienes un descuento especial. ';
        }

        // 2. Descuento por edad
        const edad = calcularEdad(formData.fechaNacimiento);
        if (edad >= 50) {
            sessionStorage.setItem('descuentoCincuenta', 'true');
            mensajeDescuento += '¡Felicidades! Has recibido un descuento del 50% por ser mayor de 50 años. ';
        }
        
        // 3. Descuento por código
        if (formData.codigoDescuento.toUpperCase() === 'FELICES50') {
            if (!sessionStorage.getItem('descuentoCincuenta')) {
                sessionStorage.setItem('descuentoFelices50', 'true');
                mensajeDescuento += 'Se ha activado tu descuento de por vida del 10% con el código "FELICES50". ';
            }
        }

        const nuevoUsuario = {
            ...formData,
            rol: rolAsignado,
            nombreCompleto: formData.nombreCompleto,
            contrasena: formData.contrasena,
            // Agregamos las propiedades de descuento para que el Header pueda leerlas si es necesario
            tieneDescuentoDuoc: !!sessionStorage.getItem('descuentoDuoc') 
        };
        
        usuariosSession.push(nuevoUsuario);
        sessionStorage.setItem('usuarios', JSON.stringify(usuariosSession));
        sessionStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

        alert(`¡Registro exitoso! ${mensajeDescuento}`);
        
        if (rolAsignado === 'administrador') {
            navigate('/admin');
        } else {
            navigate('/');
        }

        window.dispatchEvent(new Event('storageChange'));
    };
    

    // ... (El return del componente con el formulario)
    return (
        <div className="container my-5">
            <section className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Registro de usuario</h2>
                            <form id="registro-form" onSubmit={handleSubmit} className="row g-3">
                                
                                <div className="col-md-12">
                                    <label htmlFor="nombreCompleto" className="form-label">NOMBRE COMPLETO</label>
                                    <input type="text" className="form-control" id="nombreCompleto" required value={formData.nombreCompleto} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="correo" className="form-label">CORREO</label>
                                    <input type="email" className="form-control" id="correo" required value={formData.correo} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="contrasena" className="form-label">CONTRASEÑA</label>
                                    <input type="password" className="form-control" id="contrasena" required value={formData.contrasena} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="confirmarContrasena" className="form-label">CONFIRMAR CONTRASEÑA</label>
                                    <input type="password" className="form-control" id="confirmarContrasena" required value={formData.confirmarContrasena} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="fechaNacimiento" className="form-label">FECHA DE NACIMIENTO</label>
                                    <input type="date" className="form-control" id="fechaNacimiento" required value={formData.fechaNacimiento} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="codigoDescuento" className="form-label">CÓDIGO DE DESCUENTO (opcional)</label>
                                    <input type="text" className="form-control" id="codigoDescuento" value={formData.codigoDescuento} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="telefono" className="form-label">TELÉFONO (opcional)</label>
                                    <input type="tel" className="form-control" id="telefono" value={formData.telefono} onChange={handleChange} />
                                </div>
                                
                                {/* SELECTS DE REGIÓN Y COMUNA */}
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
                                            value={formData.comuna} onChange={handleChange} 
                                            disabled={comunasDisponibles.length === 0 || !formData.region}>
                                        <option disabled value="">- Seleccione una comuna -</option>
                                        {comunasDisponibles.map(comuna => (
                                            <option key={comuna} value={comuna}>{comuna}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="col-12 text-center mt-4">
                                    <button type="submit" className="btn btn-primary">REGISTRAR</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistroUsuario;