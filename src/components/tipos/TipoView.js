import React ,{useState, useEffect, use} from 'react';
import {getTipos} from '../../services/tipoService';


export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const listarTipos = async () => {
    try {
      const data = await getTipos();  
      console.log(data);
      setTipos(data);
    } catch (error) {
      console.log("Error al listar tipos: ", error);
      } 
  };

   // Función para manejar edición (sin implementar)
  const handleEditar = (tipo) => {
    console.log("Editar tipo:", tipo);
    alert(`Función de editar no implementada para: ${tipo.nombre}`);
  };

  // Función para manejar eliminación (sin implementar)
  const handleEliminar = (tipo) => {
    console.log("Eliminar tipo:", tipo);
    alert(`Función de eliminar no implementada para: ${tipo.nombre}`);
  };

  // Función para crear nuevo tipo (sin implementar)
  const handleNuevoTipo = () => {
    console.log("Crear nuevo tipo");
    alert("Función de crear nuevo tipo no implementada");
  };

  useEffect(() => {
    listarTipos();
  }, []); 
  
  return (
    <div className="container mt-4">
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
          )}
        </div>
      </div>
    </div>
  );
}
