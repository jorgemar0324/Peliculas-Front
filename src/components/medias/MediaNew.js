import React, { useState, useEffect } from 'react';
import { createMedia } from '../../services/mediaService';
import { getDirectors } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { getProductors } from '../../services/productorService';
import { getTipos } from '../../services/tipoService';
import '../../styles.css';

export const MediaNew = ({ onClose, onSuccess }) => {
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    urlImagen: '',
    año: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  // ELIMINÉ LA LÍNEA "s" QUE CAUSABA EL ERROR

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [directoresData, generosData, tiposData, productorasData] = await Promise.all([
          getDirectors(),
          getGeneros(),
          getTipos(),
          getProductors()
        ]);
        
        setDirectores(directoresData);
        setGeneros(generosData);
        setTipos(tiposData);
        setProductoras(productorasData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        alert('Error al cargar los datos necesarios');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.serial || !formData.titulo || !formData.sinopsis || !formData.url || 
        !formData.año || !formData.genero || !formData.director || !formData.productora || !formData.tipo) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    setLoading(true);
    
    try {
      const mediaData = {
        serial: formData.serial,
        titulo: formData.titulo,
        sinopsis: formData.sinopsis,
        url: formData.url,
        urlImagen: formData.urlImagen || '',
        año: parseInt(formData.año),
        genero: formData.genero,
        director: formData.director,
        productora: formData.productora,
        tipo: formData.tipo
      };

      await createMedia(mediaData);
      alert('Media creado exitosamente');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error al crear media:', error);
      alert('Error al crear media. Verifica la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content-custom" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header-custom">
          <h5 className="modal-title-custom">🎬 Crear Nuevo Media</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={onClose}
            disabled={loading}
          ></button>
        </div>
        <div className="modal-body-custom">
          {loading && !directores.length ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando datos...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="serial" className="modal-form-label">Serial *</label>
                  <input
                    type="text"
                    className="form-control modal-form-control"
                    id="serial"
                    name="serial"
                    value={formData.serial}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="titulo" className="modal-form-label">Título *</label>
                  <input
                    type="text"
                    className="form-control modal-form-control"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="sinopsis" className="modal-form-label">Sinopsis *</label>
                <textarea
                  className="form-control modal-form-control"
                  id="sinopsis"
                  name="sinopsis"
                  value={formData.sinopsis}
                  onChange={handleChange}
                  disabled={loading}
                  rows="3"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="url" className="modal-form-label">URL *</label>
                  <input
                    type="url"
                    className="form-control modal-form-control"
                    id="url"
                    name="url"
                    value={formData.url}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="urlImagen" className="modal-form-label">URL Imagen</label>
                  <input
                    type="url"
                    className="form-control modal-form-control"
                    id="urlImagen"
                    name="urlImagen"
                    value={formData.urlImagen}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="año" className="modal-form-label">Año *</label>
                  <input
                    type="number"
                    className="form-control modal-form-control"
                    id="año"
                    name="año"
                    value={formData.año}
                    onChange={handleChange}
                    disabled={loading}
                    min="1900"
                    max="2100"
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="genero" className="modal-form-label">Género *</label>
                  <select
                    className="form-select modal-form-control"
                    id="genero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Seleccionar género</option>
                    {generos.map(genero => (
                      <option key={genero._id} value={genero._id}>
                        {genero.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="director" className="modal-form-label">Director *</label>
                  <select
                    className="form-select modal-form-control"
                    id="director"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Seleccionar director</option>
                    {directores.map(director => (
                      <option key={director._id} value={director._id}>
                        {director.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="col-md-6 mb-3">
                  <label htmlFor="productora" className="modal-form-label">Productora *</label>
                  <select
                    className="form-select modal-form-control"
                    id="productora"
                    name="productora"
                    value={formData.productora}
                    onChange={handleChange}
                    disabled={loading}
                    required
                  >
                    <option value="">Seleccionar productora</option>
                    {productoras.map(productora => (
                      <option key={productora._id} value={productora._id}>
                        {productora.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="tipo" className="modal-form-label">Tipo *</label>
                <select
                  className="form-select modal-form-control"
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  disabled={loading}
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  {tipos.map(tipo => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre}
                    </option>
                  ))}
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
                      Creando...
                    </>
                  ) : (
                    'Crear Media'
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