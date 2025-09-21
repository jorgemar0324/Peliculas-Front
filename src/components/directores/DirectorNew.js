import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDirector } from '../../services/directorService';

export const DirectorNew = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'activo'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useHistory();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando se modifica
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await createDirector(formData);
      alert('Director creado exitosamente');
      navigate('/directores'); // Redirigir a la lista después de crear
    } catch (error) {
      console.error('Error:', error);
      
      // Manejar error de duplicado
      if (error.response?.status === 500 && 
          error.response?.data?.error?.includes('duplicate key')) {
        alert(`Error: Ya existe un director con el nombre "${formData.nombre}".`);
      } else {
        alert('Error al crear director. Verifica la consola para más detalles.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          
          {/* Encabezado */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>👨‍💼 Nuevo Director</h2>
            <Link to="/directores" className="btn btn-outline-secondary">
              ← Volver
            </Link>
          </div>
          
          {/* Formulario */}
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre del Director</label>
                  <input
                    type="text"
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Ingrese el nombre del director"
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="estado" className="form-label">Estado</label>
                  <select
                    className="form-select"
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
                
                <div className="d-flex justify-content-end gap-2">
                  <Link to="/directores" className="btn btn-secondary">
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creando...
                      </>
                    ) : (
                      'Crear Director'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};