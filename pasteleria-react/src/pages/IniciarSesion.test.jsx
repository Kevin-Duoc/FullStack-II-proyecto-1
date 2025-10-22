import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import IniciarSesion from './IniciarSesion';

// Mock (simulación) de la función navigate para que no intente redirigir de verdad
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock de la función alert
global.alert = vi.fn();

describe('Componente IniciarSesion', () => {

  it('debería permitir al usuario escribir en los campos de correo y contraseña', async () => {
    // 1. Arrange: Preparamos el entorno de la prueba
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/CORREO/i);
    const passwordInput = screen.getByLabelText(/CONTRASEÑA/i);

    // 2. Act: Simulamos la acción del usuario
    await user.type(emailInput, 'cliente@gmail.com');
    await user.type(passwordInput, '12345');

    // 3. Assert: Verificamos que los campos tengan el valor que escribimos
    expect(emailInput.value).toBe('cliente@gmail.com');
    expect(passwordInput.value).toBe('12345');
  });

  it('debería mostrar un mensaje de bienvenida y navegar al home si el login de cliente es exitoso', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/CORREO/i);
    const passwordInput = screen.getByLabelText(/CONTRASEÑA/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    // Simulamos que el usuario llena el formulario
    await user.type(emailInput, 'cliente@gmail.com');
    await user.type(passwordInput, '12345');
    
    // Simulamos el clic en el botón
    await user.click(submitButton);

    // Verificamos los resultados
    expect(global.alert).toHaveBeenCalledWith('¡Bienvenido(a), Cliente!');
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  it('debería navegar a /admin si el login de administrador es exitoso', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <IniciarSesion />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/CORREO/i);
    const passwordInput = screen.getByLabelText(/CONTRASEÑA/i);
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

    // Usamos las credenciales del administrador de data.js
    await user.type(emailInput, 'admin@duoc.cl');
    await user.type(passwordInput, '12345');
    
    await user.click(submitButton);

    // Verificamos que se llamó a la función de navegar hacia la ruta /admin
    expect(mockedNavigate).toHaveBeenCalledWith('/admin');
  });

});