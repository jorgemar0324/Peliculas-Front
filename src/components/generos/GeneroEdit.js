import React, { useState, useEffect } from 'react';
import { updateGenero, getGeneroById } from '../../services/generoService';
import '../../styles.css'; 

export const GeneroEdit = ({ generoId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'activo'
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadGeneroData = async () => {
      try {
        setInitialLoading(true);
        const genero = await getGeneroById(generoId);
        setFormData({
          nombre: genero.nombre || '',
          descripcion: genero.descripcion || '',
          estado: genero.estado || 'activo'
        });
      } catch (error) {
        console.error('Error al cargar género:', error);
        alert('Error al cargar los datos del género');
        onClose();
      } finally {
        setInitialLoading(false);
      }
    };

    if (generoId) {
      loadGeneroData();
    }
  }, [generoId, onClose]);

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
      await updateGenero(generoId, formData);
      alert('Género actualizado exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar género:', error);
      alert('Error al actualizar género. Verifica la consola para más detalles.');
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
            <p className="mt-2">Cargando datos del género...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">✏️ Editar Género</h5>
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
                {loading ? 'Actualizando...' : 'Actualizar Género'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};