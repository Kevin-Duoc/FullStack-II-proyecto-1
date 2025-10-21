// src/pages/admin/AdminNuevoProducto.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarProducto } from "../../data/data";

const AdminNuevoProducto = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    stock: "",
    stockCritico: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos
    if (!formData.id || !formData.nombre || !formData.precio) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    // Guardar el nuevo producto
    agregarProducto({
      ...formData,
      precio: parseInt(formData.precio),
      stock: parseInt(formData.stock),
      stockCritico: parseInt(formData.stockCritico),
    });

    alert("Producto agregado con éxito ✅");
    navigate("/admin/productos");
  };

  return (
    <div className="container-fluid bg-light p-4 rounded shadow-sm">
      <h2 className="mb-4">🧁 Nuevo Producto</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Código (ID)</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="2"
          ></textarea>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              className="form-control"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label">Stock Crítico</label>
            <input
              type="number"
              className="form-control"
              name="stockCritico"
              value={formData.stockCritico}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (nombre de archivo)</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">
          Guardar Producto
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/admin/productos")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AdminNuevoProducto;
