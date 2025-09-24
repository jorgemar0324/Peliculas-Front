import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles.css'

export const MediaCard = ({ media }) => {
  return (
    <div className="col">
      <div className="card h-100 media-card">
        <img 
          src={media.urlImagen} 
          className="card-img-top media-card-img"  
          alt={media.titulo}
        />
        <div className="card-body">
          <h5 className="card-title media-card-title">{media.titulo}</h5>
          <hr className="media-card-divider" />
          <p className="card-text media-card-text"><strong>Serial:</strong> {media.serial}</p>
          <p className="card-text media-card-text"><strong>Director:</strong> {media.director?.nombre}</p>
          <p className="card-text media-card-text"><strong>Género:</strong> {media.genero?.nombre}</p>
          <p className="card-text media-card-text"><strong>Año:</strong> {media.año}</p>
          <p className="card-text media-card-text"><strong>Tipo:</strong> {media.tipo?.nombre}</p>
          
          <div className="mt-3">
            <Link 
              to={`/medias/edit/${media._id}`}
              className="btn btn-outline-primary btn-sm"
            >
              <i className="fas fa-edit me-1"></i>
              Detalles/Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};