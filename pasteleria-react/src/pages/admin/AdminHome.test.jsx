import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import AdminHome from './AdminHome';

describe('Componente AdminHome', () => {

  //se limpia sessionStorage antes de cada prueba para asegurar un entorno limpio
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('debería mostrar "No hay mensajes recientes" si no hay mensajes en sessionStorage', () => {
    // 1. Arrange: Nos aseguramos que no hay nada en sessionStorage.
    // (beforeEach ya lo limpió)

    // 2. Act: Renderizamos el componente.
    render(<AdminHome />);

    // 3. Assert: Verificamos que se muestre el mensaje correcto.
    const noMessagesText = screen.getByText(/No hay mensajes recientes/i);
    expect(noMessagesText).toBeInTheDocument();
  });

  it('debería mostrar los mensajes guardados en sessionStorage', () => {
    // 1. Arrange: Creamos mensajes de prueba y los guardamos en sessionStorage.
    const mockMensajes = [
      {
        nombre: 'Usuario de Prueba',
        correo: 'test@test.com',
        mensaje: 'Este es un mensaje de prueba.',
        fecha: new Date().toISOString()
      }
    ];
    sessionStorage.setItem('mensajes', JSON.stringify(mockMensajes));

    // 2. Act: Renderizamos el componente.
    render(<AdminHome />);

    // 3. Assert: Verificamos que la información de los mensajes de prueba se muestre en pantalla.
    const nombreRemitente = screen.getByText(/De: Usuario de Prueba/i);
    const mensajeTexto = screen.getByText(/Este es un mensaje de prueba./i);

    expect(nombreRemitente).toBeInTheDocument();
    expect(mensajeTexto).toBeInTheDocument();
  });
});