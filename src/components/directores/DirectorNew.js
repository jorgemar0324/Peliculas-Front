import React, { useState } from 'react';
import { createDirector } from '../../services/directorService';
import '../../styles.css'; // Importar estilos

export const DirectorNew = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',    
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
      await createDirector(formData);
      alert('Director creado exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al crear el director:', error);
      alert('Error al crear director. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">🎬 Nuevo Director</h5>
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
              <label htmlFor="nombre" className="modal-form-label">Nombre del Director</label>
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
                {loading ? 'Creando...' : 'Crear Director'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};