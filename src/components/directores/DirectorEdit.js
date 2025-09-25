import React, { useState, useEffect } from 'react';
import { updateDirector, getDirectorById } from '../../services/directorService';
import '../../styles.css'; 

export const DirectorEdit = ({ directorId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',    
    estado: 'activo'
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadDirectorData = async () => {
      try {
        setInitialLoading(true);
        const director = await getDirectorById(directorId);
        setFormData({
          nombre: director.nombre || '',          
          estado: director.estado || 'activo'
        } );
                
      } catch (error) {
        console.error('Error al cargar director:', error);
        alert('Error al cargar los datos del director');
        onClose();
      } finally {
        setInitialLoading(false);
      }
    };

        if (directorId) {
      loadDirectorData();
    }
  }, [directorId, onClose]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }
    
    setLoading(true);
    
    try {
      await updateDirector(directorId, formData);
      alert('Director actualizado exitosamente');
      onSuccess(); 
      onClose(); 
    } catch (error) {
      console.error('Error al actualizar director:', error);
      alert('Error al actualizar director. Verifica la consola para más detalles.');
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
            <p className="mt-2">Cargando datos del director...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">✏️ Editar Director</h5>
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
                {loading ? 'Actualizando...' : 'Actualizar Director'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};