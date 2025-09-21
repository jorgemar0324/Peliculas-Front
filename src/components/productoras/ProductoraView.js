import React ,{useState, useEffect, use} from 'react';
import {getProductors} from '../../services/productorService';
import {ProductoraNew} from './ProductoraNew';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const listarProductoras = async () => {
    try {
      const data = await getProductors();
      console.log(data);
      setProductoras(data);
    } catch (error) {
      console.log("Error al listar productoras: ", error);
      }
  };
  
    // Función para manejar edición (sin implementar)
  const handleEditar = (productora) => {
    console.log("Editar productora:", productora);
    alert(`Función de editar no implementada para: ${productora.nombre}`);
  };

  // Función para manejar eliminación (sin implementar)
  const handleEliminar = (productora) => {
    console.log("Eliminar productora:", productora);
    alert(`Función de eliminar no implementada para: ${productora.nombre}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

    const handleSuccess = () => {
    listarProductoras();
  };

  // Función para crear nuevo productora (sin implementar)
  const handleNuevaProductora = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    listarProductoras();
  }, []);

  return (
    <div className="container mt-4">
      {openModal && (
              <ProductoraNew 
                onClose={handleCloseModal} 
                onSuccess={handleSuccess}
              />
            )}
      <div className="row">
        <div className="col-12">
                    
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-black mb-0">🎬 Productoras</h2>
            <button 
              className="btn btn-success"
              onClick={handleNuevaProductora}
              style={{ cursor: 'pointer' }}
            >
              <i className="fas fa-plus me-2"></i>
              Nueva Productora
            </button>
          </div>
          
          {productoras.length === 0 ? (
            <div className="alert alert-info">
              No hay Productoras registradas
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Slogan</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha Creación</th>
                    <th scope="col" className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productoras.map((productora, index) => (
                    <tr key={productora._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{productora.nombre}</td>
                      <td>{productora.descripcion}</td>
                      <td>{productora.slogan}</td>
                      <td>
                        <span className={`badge bg-${productora.estado === 'activo' ? 'success' : 'warning'}`}>
                          {productora.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(productora.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditar(productora)}
                          style={{ cursor: 'pointer' }}
                          title="Editar Productora"
                        >
                          <i className="fas fa-edit me-1"></i>
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(productora)}
                          style={{ cursor: 'pointer' }}
                          title="Eliminar Productora"
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
