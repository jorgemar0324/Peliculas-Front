import React, { useState, useEffect } from 'react';
import { getMedia } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';
import '../../styles.css';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const listarMedias = async () => {
    try {
      setLoading(true);
      const response = await getMedia();
      
      let mediaData = [];
      if (response.data && Array.isArray(response.data)) {
      mediaData = response.data; 
      } else if (Array.isArray(response)) {
        mediaData = response; 
      }
      
      setMedias(mediaData);
      setFilteredMedias(mediaData);
    } catch (error) {
      console.log("Error al listar medias: ", error);
      setMedias([]);
      setFilteredMedias([]);
    } finally {
      setLoading(false);
    }
  };

  const filterMedias = (term) => {
    if (!term.trim()) {
      setFilteredMedias(medias);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    
    const filtered = medias.filter(media => {
      if (media.titulo?.toLowerCase().includes(lowercasedTerm)) return true;
      if (media.serial?.toLowerCase().includes(lowercasedTerm)) return true;
      if (media.genero?.nombre?.toLowerCase().includes(lowercasedTerm)) return true;
      if (media.director?.nombre?.toLowerCase().includes(lowercasedTerm)) return true;
      if (media.tipo?.nombre?.toLowerCase().includes(lowercasedTerm)) return true;
      if (media.año?.toString().includes(lowercasedTerm)) return true;
      if (media.sinopsis?.toLowerCase().includes(lowercasedTerm)) return true;
      return false;
    });
    
    setFilteredMedias(filtered);
  };

  useEffect(() => {
    filterMedias(searchTerm);
  }, [searchTerm, medias]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccess = () => {
    listarMedias();
  };

  useEffect(() => {
    listarMedias();
  }, []);

  return (
    <div className='container mt-4'>
      {openModal && (
        <MediaNew 
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-black mb-0">🎬 Catálogo de Medios</h2>
        <button 
          className="btn btn-success"
          onClick={handleOpenModal}
          style={{ cursor: 'pointer' }}
        >
          <i className="fas fa-plus me-2"></i>
          Crear Media
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por título, género, director, año, serial..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={handleClearSearch}
                    title="Limpiar búsqueda"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              {searchTerm && (
                <div className="mt-2">
                  <small className="text-muted">
                    {filteredMedias.length} resultado(s) encontrado(s) para: "{searchTerm}"
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando medias...</p>
        </div>
      ) : (
        <>
          {filteredMedias.length === 0 ? (
            <div className="alert alert-info">
              {searchTerm ? (
                `No se encontraron medios que coincidan con: "${searchTerm}"`
              ) : (
                'No hay medios registrados'
              )}
            </div>
          ) : (
            <>
              {searchTerm && (
                <div className="mb-3">
                  <p className="text-muted">
                    <strong>{filteredMedias.length}</strong> medio(s) encontrado(s)
                  </p>
                </div>
              )}
              
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredMedias.map(media => (
                  <MediaCard key={media._id} media={media} /> 
                ))}  
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
