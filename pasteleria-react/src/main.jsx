import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

// Importación del CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// Importación del JS de Bootstrap 
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

// Importación del CSS Personalizado 
import './assets/style.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos la aplicación en BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);