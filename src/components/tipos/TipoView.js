import React, { useState, useEffect, use } from 'react';
import { getTipos, deleteTipo } from '../../services/tipoService';
import { TipoNew } from './TipoNew';
import { TipoEdit } from './TipoEdit';
import '../../styles.css';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [tipoToEdit, setTipoToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [eliminando, setEliminando] = useState(false);


  const listarTipos = async () => {
    try {
      const data = await getTipos();
      setTipos(data);
      setError(null);
    } catch (error) {
      console.log("Error al listar tipos: ", error);
      setError("Error al cargar los tipos de media.");
    }
  };



  const handleEditar = (tipo) => {
    setTipoToEdit(tipo);
    setEditModal(true);
  };


  const handleEliminar = async (tipo) => {
    if (window.confirm(`¿Estás seguro de eliminar el tipo "${tipo.nombre}"?`)) {
      try {
        setEliminando(true);

        const response = await deleteTipo(tipo._id);

        // Verificar si la respuesta indica éxito
        if (response.success) {
          alert('Tipo eliminado exitosamente');
          listarTipos();
        } else {
          alert(response.message || 'No se pudo eliminar el tipo');
        }

      } catch (error) {
        console.error('Error al eliminar el tipo:', error);

        if (error.response && error.response.data) {
          const errorData = error.response.data;
          alert(errorData.message || 'Error al eliminar el tipo');
        } else {
          alert('Error al eliminar el tipo. Verifica la consola para más detalles.');
        }
      } finally {
        setEliminando(false);
      }
    }
  };


  const handleNuevoTipo = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setTipoToEdit(null);
  };

  const handleSuccess = () => {
    listarTipos();
    handleCloseModal();
  };

  useEffect(() => {
    listarTipos();
  }, []);


  return (
    <div className="container mt-4">

      {openModal && (
        <TipoNew
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}


      {editModal && tipoToEdit && (
        <TipoEdit
          tipoId={tipoToEdit._id}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}

      <div className="row">
        <div className="col-12">

          {/* Encabezado con título y botón */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black mb-0">🎬 Tipos Media</h2>
            <button
              className="btn btn-success"
              onClick={handleNuevoTipo}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-plus me-2"></i>
              Nuevo Tipo
            </button>
          </div>

          {tipos.length === 0 ? (
            <div className="alert alert-info">
              No hay Tipos de Media registrados
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha Creación</th>
                    <th scope="col" className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tipos.map((tipo, index) => (
                    <tr key={tipo._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{tipo.nombre}</td>
                      <td>{tipo.descripcion}</td>
                      <td>
                        {new Date(tipo.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditar(tipo)}
                          style={{ cursor: 'pointer' }}
                          title="Editar tipo"
                        >
                          <i className="fas fa-edit me-1"></i>
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(tipo)}
                          style={{ cursor: 'pointer' }}
                          title="Eliminar tipo"
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


