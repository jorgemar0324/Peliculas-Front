import React, { useState, useEffect } from 'react';
import { getGeneros, deleteGenero } from '../../services/generoService';
import { GeneroNew } from './GeneroNew';
import { GeneroEdit } from './GeneroEdit';
import '../../styles.css';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [generoToEdit, setGeneroToEdit] = useState(null);
  const [error, setError] = useState(null);  
  const [eliminando, setEliminando] = useState(false);

  const listarGeneros = async () => {
    try {
      const data = await getGeneros();
      setGeneros(data);
      setError(null);
    } catch (error) {
      console.log("Error al listar géneros: ", error);
      setError("Error al cargar los géneros.");
    }
  };  

  const handleEditar = (genero) => {
    setGeneroToEdit(genero);
    setEditModal(true);
  };

  const handleEliminar = async (genero) => {
    if (window.confirm(`¿Estás seguro de eliminar el género "${genero.nombre}"?`)) {
      try {
        setEliminando(true);
        await deleteTipo(tipo._id);
        
        const response = await deleteGenero(genero._id);
        
        if (response.success) {
          alert('Género eliminado exitosamente');
          listarGeneros();
        } else {
          alert(response.message || 'No se pudo eliminar el Género');
        }

      } catch (error) {
        console.error('Error al eliminar el Genero:', error);

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          alert(errorData.message || 'Error al eliminar el Genero');
        } else {
          alert('Error al eliminar el Genero. Verifica la consola para más detalles.');
        }
      } finally {
        setEliminando(false);
      }
    }
  };

  const handleNuevoGenero = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setGeneroToEdit(null);
  };

  const handleSuccess = () => {
    listarGeneros();
    handleCloseModal();
  };

  useEffect(() => {
    listarGeneros();
  }, []); 

  return (
    <div className="container mt-4">      
      {/* Modal para nuevo género */}
      {openModal && (
        <GeneroNew 
          onClose={handleCloseModal} 
          onSuccess={handleSuccess}
        />
      )}
      
      {/* Modal para editar género */}
      {editModal && generoToEdit && (
        <GeneroEdit 
          generoId={generoToEdit._id}
          onClose={handleCloseModal} 
          onSuccess={handleSuccess}
        />
      )}
      
      <div className="row">
        <div className="col-12">      
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black mb-0">🎬 Géneros Peliculas</h2>            
            <button 
              className="btn btn-success" 
              onClick={handleNuevoGenero} 
              style={{ cursor: 'pointer' }}
              disabled={eliminando}
            >
              <i className="fas fa-plus me-2"></i>
              Nuevo Género
            </button>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          {generos.length === 0 && !error ? (
            <div className="alert alert-info">
              No hay géneros registrados
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha Creación</th>
                    <th scope="col" className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {generos.map((genero, index) => (
                    <tr key={genero._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{genero.nombre}</td>
                      <td>{genero.descripcion || 'Sin descripción'}</td>
                      <td>
                        <span className={`badge bg-${genero.estado === 'activo' ? 'success' : 'warning'}`}>
                          {genero.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(genero.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditar(genero)}
                          style={{ cursor: 'pointer' }}
                          title="Editar Género"
                          disabled={eliminando}
                        >
                          <i className="fas fa-edit me-1"></i>
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(genero)}
                          style={{ cursor: 'pointer' }}
                          title="Eliminar Género"
                          disabled={eliminando}
                        >
                          {eliminando ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                              Eliminando...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-trash me-1"></i>
                              Eliminar
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}          
        </div>
      </div>
    </div>
  );
};