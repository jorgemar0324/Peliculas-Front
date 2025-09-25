import React, { useState, useEffect } from 'react';
import { getDirectors, deleteDirector } from '../../services/directorService';
import { DirectorNew } from './DirectorNew';
import { DirectorEdit } from './DirectorEdit';
import '../../styles.css';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [directorToEdit, setDirectorToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [directorAEliminar, setDirectorAEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);

  const listarDirectores = async () => {
    try {
      const data = await getDirectors();
      setDirectores(data);
      setError(null);
    } catch (error) {
      console.log("Error al listar directores: ", error);
      setError("Error al cargar los directores.");
    }
  };  

  const handleEditar = (director) => {
    setDirectorToEdit(director);
    setEditModal(true);
  };

  const handleEliminar = async (director) => {
    if (window.confirm(`¿Estás seguro de eliminar el director "${director.nombre}"?`)) {
      try {
        setEliminando(true);
        await deleteDirector(director._id);
        alert('Director eliminado exitosamente');
        listarDirectores(); 
      } catch (error) {
        console.error('Error al eliminar director:', error);
        alert('Error al eliminar director. Verifica la consola para más detalles.');
      } finally {
        setEliminando(false);
      }
    }
  };

  const handleNuevoDirector = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setDirectorToEdit(null);
  };

  const handleSuccess = () => {
    listarDirectores();
    handleCloseModal();
  };

  useEffect(() => {
    listarDirectores();
  }, []); 

  return (
    <div className="container mt-4">      
      
      {openModal && (
        <DirectorNew 
          onClose={handleCloseModal} 
          onSuccess={handleSuccess}
        />
      )}
      
      
      {editModal && directorToEdit && (
        <DirectorEdit 
          directorId={directorToEdit._id}
          onClose={handleCloseModal} 
          onSuccess={handleSuccess}
        />
      )}
      
      <div className="row">
        <div className="col-12">      
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black mb-0">🎬 Directores de Películas</h2>            
            <button 
              className="btn btn-success" 
              onClick={handleNuevoDirector} 
              style={{ cursor: 'pointer' }}
              disabled={eliminando}
            >
              <i className="fas fa-plus me-2"></i>
              Nuevo Director
            </button>
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          {directores.length === 0 && !error ? (
            <div className="alert alert-info">
              No hay Directores registrados
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>                    
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha Creación</th>
                    <th scope="col" className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {directores.map((director, index) => (
                    <tr key={director._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{director.nombre}</td>                      
                      <td>
                        <span className={`badge bg-${director.estado === 'activo' ? 'success' : 'warning'}`}>
                          {director.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(director.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditar(director)}
                          style={{ cursor: 'pointer' }}
                          title="Editar Director"
                          disabled={eliminando}
                        >
                          <i className="fas fa-edit me-1"></i>
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(director)}
                          style={{ cursor: 'pointer' }}
                          title="Eliminar Director"
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