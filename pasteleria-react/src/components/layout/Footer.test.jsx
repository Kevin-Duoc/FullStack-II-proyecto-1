import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Componente Footer', () => {

  it('debería renderizar el texto de copyright correctamente', () => {
    // 1. Renderizamos el componente
    render(<Footer />);

    // 2. Buscamos el texto específico del copyright en el componente renderizado.
    // Usamos una expresión regular /.../i para que no importe si hay mayúsculas o minúsculas.
    const copyrightText = screen.getByText(/© 2025 Pastelería 1000 Sabores. Todos los derechos reservados./i);

    // 3. Afirmamos que el texto encontrado está presente en el documento.
    expect(copyrightText).toBeInTheDocument();
  });

});