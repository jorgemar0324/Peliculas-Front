import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMediaById, updateMedia } from '../../services/mediaService';
import { getDirectors } from '../../services/directorService';
import { getGeneros } from '../../services/generoService';
import { getProductors } from '../../services/productorService';
import { getTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';
import '../../styles.css';

export const MediaEdit = () => {
  const { id } = useParams();
  const history = useHistory();
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

  
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando datos...'
        });
        Swal.showLoading();

        
        const [mediaResponse, directoresResponse, generosResponse, tiposResponse, productorasResponse] = await Promise.all([
          getMediaById(id),
          getDirectors(),
          getGeneros(),
          getTipos(),
          getProductors()
        ]);

        const mediaData = mediaResponse.data || mediaResponse;        
        

        // Establecer datos del media en el formulario
        setFormData({
          serial: mediaData.serial || '',
          titulo: mediaData.titulo || '',
          sinopsis: mediaData.sinopsis || '',
          url: mediaData.url || '',
          urlImagen: mediaData.urlImagen || '',
          año: mediaData.año || mediaData.anio || '',
          genero: mediaData.genero?._id || mediaData.genero || '',
          director: mediaData.director?._id || mediaData.director || '',
          productora: mediaData.productora?._id || mediaData.productora || '',
          tipo: mediaData.tipo?._id || mediaData.tipo || ''
        });

        setDirectores(directoresResponse.data || directoresResponse);
        setGeneros(generosResponse.data || generosResponse);
        setTipos(tiposResponse.data || tiposResponse);
        setProductoras(productorasResponse.data || productorasResponse);

        Swal.close();
        
      } catch (error) {
        console.error('Error al cargar datos:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos del media', 'error');
        history.push('/'); 
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadAllData();
    }
  }, [id, history]);

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
    if (!formData.serial || !formData.titulo || !formData.sinopsis || !formData.url || 
        !formData.año || !formData.genero || !formData.director || !formData.productora || !formData.tipo) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios', 'warning');
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

      await updateMedia(id, mediaData);
      
      Swal.fire('¡Éxito!', 'Media actualizado exitosamente', 'success')
        .then(() => {
          history.push('/'); 
        });

    } catch (error) {
      console.error('Error al actualizar media:', error);
      Swal.fire('Error', 'Error al actualizar media. Verifica la consola para más detalles.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    history.push('/'); // Redirigir a la página principal al cancelar
  };

  if (loading && !formData.titulo) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando datos del media...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">✏️ Editar Media</h2>
          <p className="text-muted">Editando: {formData.titulo}</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="serial" className="form-label">Serial *</label>
                <input
                  type="text"
                  className="form-control"
                  id="serial"
                  name="serial"
                  value={formData.serial}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="titulo" className="form-label">Título *</label>
                <input
                  type="text"
                  className="form-control"
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
              <label htmlFor="sinopsis" className="form-label">Sinopsis *</label>
              <textarea
                className="form-control"
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
                <label htmlFor="url" className="form-label">URL *</label>
                <input
                  type="url"
                  className="form-control"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="urlImagen" className="form-label">URL Imagen</label>
                <input
                  type="url"
                  className="form-control"
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
                <label htmlFor="año" className="form-label">Año *</label>
                <input
                  type="number"
                  className="form-control"
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
                <label htmlFor="genero" className="form-label">Género *</label>
                <select
                  className="form-select"
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
                <label htmlFor="director" className="form-label">Director *</label>
                <select
                  className="form-select"
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
                <label htmlFor="productora" className="form-label">Productora *</label>
                <select
                  className="form-select"
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
              <label htmlFor="tipo" className="form-label">Tipo *</label>
              <select
                className="form-select"
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

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
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
                  'Actualizar Media'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};