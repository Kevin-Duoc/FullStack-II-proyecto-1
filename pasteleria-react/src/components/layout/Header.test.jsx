import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Componente Header', () => {

  it('debería renderizar el logo y el nombre de la pastelería', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const siteName = screen.getByText(/Pastelería 1000 Sabores/i);
    const logo = screen.getByAltText(/Logo de Pastelería 1000 Sabores/i);

    expect(siteName).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  it('debería mostrar los botones "Iniciar sesión" y "Registrarse" cuando no hay un usuario logueado', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const loginButton = screen.getByText(/Iniciar sesión/i);
    const registerButton = screen.getByText(/Registrarse/i);

    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('debería mostrar el saludo y el panel de admin para un usuario administrador', () => {
    const adminUser = { nombreCompleto: 'Admin Pastelero', rol: 'administrador' };
    sessionStorage.setItem('usuarioActual', JSON.stringify(adminUser));

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const welcomeMessage = screen.getByText(/¡Hola, Admin!/i);
    const adminPanelLink = screen.getByText(/Panel Admin/i);

    expect(welcomeMessage).toBeInTheDocument();
    expect(adminPanelLink).toBeInTheDocument();

    sessionStorage.clear();
  });
}); // <--- ESTA LÍNEA FALTABA