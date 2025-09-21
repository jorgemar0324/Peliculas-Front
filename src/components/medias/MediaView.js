import React, { useState, useEffect } from 'react';
import { getMedia } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';
import '../../styles.css';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const listarMedias = async () => {
    try {
      setLoading(true);
      const response = await getMedia();
      
      if (response.data && Array.isArray(response.data)) {
        setMedias(response.data); 
      } else if (Array.isArray(response)) {
        setMedias(response); 
      } else {
        setMedias([]);
      }
    } catch (error) {
      console.log("Error al listar medias: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccess = () => {
    listarMedias(); // Recargar la lista después de crear
  };

  useEffect(() => {
    listarMedias();
  }, []);

  return (
    <div className='container mt-4'>
      {/* Modal para crear nuevo media */}
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
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Cargando medias...</p>
        </div>
      ) : (
        <>
          {medias.length === 0 ? (
            <div className="alert alert-info">
              No hay medios registrados
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {medias.map(media => (
                <MediaCard key={media._id} media={media} /> 
              ))}  
            </div>
          )}
        </>
      )}
    </div>
  );
};