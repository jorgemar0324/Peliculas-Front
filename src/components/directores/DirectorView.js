import React, { useState, useEffect } from 'react';
import { getDirectors } from '../../services/directorService';
import { Link } from 'react-router-dom';

export const DirectorView = () => {
  const [directores, setDirectores] = useState([]);


  const listarDirectores = async () => {

    const data = await getDirectors();
    setDirectores(data);
  };


  const handleEditar = (director) => {
  };


  const handleEliminar = (director) => {

  };

  useEffect(() => {
    listarDirectores();
  }, []);



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black mb-0">🎬 Directores</h2>
            <Link to="/directores/nuevo" className="btn btn-success">
              <i className="fas fa-plus me-2"></i>
              Nuevo Director
            </Link>
          </div>

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
                      <Link
                        to={`/directores/editar/${director._id}`}
                        className="btn btn-sm btn-primary me-2"
                        title="Editar director"
                      >
                        <i className="fas fa-edit me-1"></i>
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(director)}
                        style={{ cursor: 'pointer' }}
                        title="Eliminar director"
                      >
                        <i className="fas fa-trash me-1"></i>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};