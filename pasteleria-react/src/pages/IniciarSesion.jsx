import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsuariosFijos } from '../data/data';

const LOGO_PATH = '/images/logo_empresa.png';

const IniciarSesion = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let valid = true;
        
        // 1. Validaciones (Migradas de validaciones.js)
        const emailRegex = /(@duoc.cl|@profesor.duoc.cl|@gmail.com)$/;
        if (!emailRegex.test(correo) || correo.length > 100) {
            alert('El correo debe ser de los dominios @duoc.cl, @profesor.duoc.cl o @gmail.com y no exceder 100 caracteres.');
            valid = false;
        }
        if (contrasena.length < 4 || contrasena.length > 10) {
            alert('La contraseña debe tener entre 4 y 10 caracteres.');
            valid = false;
        }

        if (valid) {
            // 2. Búsqueda de Usuario (Combinando usuarios fijos y registrados)
            const usuariosFijos = getUsuariosFijos();
            const usuariosSession = JSON.parse(sessionStorage.getItem('usuarios') || '[]');
            const todosUsuarios = [...usuariosFijos, ...usuariosSession];

            const usuario = todosUsuarios.find(u => 
                u.correo === correo && u.contrasena === contrasena
            );
            
            if (usuario) {
                // 3. Inicio de Sesión Exitoso (Guardamos la sesión)
                sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
                alert(`¡Bienvenido(a), ${usuario.nombreCompleto.split(' ')[0]}!`);

                window.dispatchEvent(new Event('storageChange'));

                // 4. Redirección por Rol
                if (usuario.rol === 'administrador' || usuario.rol === 'vendedor') {
                    navigate('/admin');
                } else if (usuario.rol === 'cliente') {
                    navigate('/');
                }
            } else {
                alert('Correo o contraseña incorrectos.');
            }
        }
    };

    return (
        <div className="container my-5">
            <section className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <div style={{ width: '100px', height: '100px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={LOGO_PATH} alt="logo de la empresa" className="company-logo" />
                        </div>
                        <h2 className="mt-3">Pastelería 1000 Sabores</h2>
                    </div>
                    <div className="card p-4">
                        <div className="card-body">
                            <span className="site-name"><h4 className="card-title text-center mb-4">Iniciar sesión</h4></span>
                            
                            <form id="login-form" onSubmit={handleSubmit} className="row g-3">
                                <div><h6>Accede a tu cuenta para disfrutar de nuestros productos</h6></div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="correo" className="form-label">CORREO</label>
                                    <input type="email" className="form-control" id="correo" required 
                                        value={correo} onChange={(e) => setCorreo(e.target.value)}
                                    />
                                </div>
                                
                                <div className="col-md-12">
                                    <label htmlFor="contrasena" className="form-label">CONTRASEÑA</label>
                                    <input type="password" className="form-control" id="contrasena" required 
                                        value={contrasena} onChange={(e) => setContrasena(e.target.value)}
                                    />
                                </div>
                                
                                <div className="col-12 text-center mt-4">
                                    <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                                </div>
                                
                                <div>
                                    ¿No tienes cuenta?
                                    <Link to="/registro" className="registro-link">Regístrate aquí</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IniciarSesion;