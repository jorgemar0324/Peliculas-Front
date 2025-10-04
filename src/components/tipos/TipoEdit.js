import React, { useState, useEffect } from 'react';
import { updateTipo, getTipoById } from '../../services/tipoService';
import '../../styles.css'; 

export const TipoEdit = ({ tipoId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''    
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadTipoData = async () => {
      try {
        setInitialLoading(true);
        const tipo = await getTipoById(tipoId);
        setFormData({
          nombre: tipo.nombre || '',
          descripcion: tipo.descripcion || ''
         
        });
      } catch (error) {
        console.error('Error al cargar el tipo:', error);
        alert('Error al cargar los datos del tipo');
        onClose();
      } finally {
        setInitialLoading(false);
      }
    };

    if (tipoId) {
      loadTipoData();
    }
  }, [tipoId, onClose]);

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
      await updateTipo(tipoId, formData);
      alert('Tipo actualizado exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar el tipo:', error);
      alert('Error al actualizar el tipo. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="modal-backdrop">
        <div className="modal-content-custom">
          <div className="modal-body-custom text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando datos del tipo...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">✏️ Editar tipo</h5>
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
              <label htmlFor="descripcion" className="modal-form-label">Descripción</label>
              <textarea
                className="form-control modal-form-control"
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                disabled={loading}                
                rows="3"
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
                {loading ? 'Actualizando...' : 'Actualizar Tipo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};