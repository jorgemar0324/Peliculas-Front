import React, { useState, useEffect } from 'react';
import { updateProductor, getProductorById } from '../../services/productorService';
import '../../styles.css'; 

export const ProductoraEdit = ({ productoraId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    slogan: '',
    estado: 'activo'
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadProductoraData = async () => {
      try {
        setInitialLoading(true);
        const productora = await getProductorById(productoraId);
        setFormData({
          nombre: productora.nombre || '',
          descripcion: productora.descripcion || '',
          slogan: productora.slogan || '', // CORREGIDO: era productora.descripcion
          estado: productora.estado || 'activo'
        });
      } catch (error) {
        console.error('Error al cargar productora:', error);
        alert('Error al cargar los datos de la productora');
        onClose();
      } finally {
        setInitialLoading(false);
      }
    };

    if (productoraId) {
      loadProductoraData();
    }
  }, [productoraId, onClose]);

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
      await updateProductor(productoraId, formData);
      alert('Productora actualizada exitosamente');
      onSuccess(); // Recargar la lista
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al actualizar productora:', error);
      alert('Error al actualizar productora.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom">
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">🎬 Editar Productora</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            disabled={loading}
          ></button>
        </div>
        <div className="modal-body-custom">
          {initialLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando datos de la productora...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="modal-form-label">Nombre de la Productora</label>
                <input
                  type="text"
                  className="form-control modal-form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Ej: Paramount, Sony, Warner Bros"
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
                  placeholder="Descripción de la Productora"
                  rows="3"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="slogan" className="modal-form-label">Slogan</label>
                <textarea
                  className="form-control modal-form-control"
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Slogan de la Productora"
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
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Actualizando...
                    </>
                  ) : (
                    'Actualizar Productora'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};