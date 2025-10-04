import React, { useState } from 'react';
import { createTipo } from '../../services/tipoService';
import '../../styles.css'; // Importar estilos

export const TipoNew = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    setLoading(true);

    try {
      await createTipo(formData);
      alert('Tipo creado exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear el tipo:', error);
      alert('Error al crear tipo. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">🎬 Nuevo Tipo de Media</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            disabled={loading}
          ></button>
        </div>
        <div className="modal-body-custom">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="modal-form-label">Tipo de Media</label>
              <input
                type="text"
                className="form-control modal-form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="modal-form-label">Descripción</label>
              <input                
                className="form-control modal-form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="modal-buttons-container">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && <span className="loading-spinner"></span>}
                {loading ? 'Creando...' : 'Crear Tipo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};