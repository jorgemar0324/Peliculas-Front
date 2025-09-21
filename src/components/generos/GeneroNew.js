import React, { useState } from 'react';
import { createGenero } from '../../services/generoService';
import '../../styles.css'; // Importar estilos

export const GeneroNew = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'activo'
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
      await createGenero(formData);
      alert('Género creado exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear género:', error);
      alert('Error al crear género. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">🎬 Nuevo Género</h5>
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
              <label htmlFor="nombre" className="modal-form-label">Nombre del Género</label>
              <input
                type="text"
                className="form-control modal-form-control"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={loading}
                placeholder="Ej: Acción, Comedia, Drama"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="descripcion" className="modal-form-label">Descripción</label>
              <textarea
                className="form-control modal-form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}
                placeholder="Descripción opcional del género"
                rows="3"
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="estado" className="modal-form-label">Estado</label>
              <select
                className="form-select modal-form-control"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
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
                {loading ? 'Creando...' : 'Crear Género'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};