import React ,{useState, useEffect} from 'react';
import {getProductors} from '../../services/productorService';
import {ProductoraNew} from './ProductoraNew';
import { ProductoraEdit } from './ProductoraEdit';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productoraToEdit, setProductoraToEdit] = useState(null); // Cambiado a mayúscula
  const [error, setError] = useState(null);  
  const [eliminando, setEliminando] = useState(false);

  const listarProductoras = async () => {
    try {
      const data = await getProductors();      
      setProductoras(data);
      setError(null);
    } catch (error) {
      console.log("Error al listar productoras: ", error);
      setError("Error al cargar las productoras.");
      }
  };
  
  const handleEditar = (productor) => {
    setProductoraToEdit(productor); // Cambiado a mayúscula
    setEditModal(true);
  };

  // Función para manejar eliminación (sin implementar)
  const handleEliminar = (productor) => {
    console.log("Eliminar productora:", productor);
    alert(`Función de eliminar no implementada para: ${productor.nombre}`);
  };

  const handleNuevaProductora = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditModal(false);
    setProductoraToEdit(null); // Cambiado a mayúscula
  };

  const handleSuccess = () => {
    listarProductoras();
    handleCloseModal();
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

      {/* Modal para editar productora */}
            {editModal && productoraToEdit && (
              <ProductoraEdit 
                productoraId={productoraToEdit._id}
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
                  {productoras.map((productor, index) => (
                    <tr key={productor._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{productor.nombre}</td>
                      <td>{productor.descripcion}</td>
                      <td>{productor.slogan}</td>
                      <td>
                        <span className={`badge bg-${productor.estado === 'activo' ? 'success' : 'warning'}`}>
                          {productor.estado}
                        </span>
                      </td>
                      <td>
                        {new Date(productor.fechaCreacion).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEditar(productor)}
                          style={{ cursor: 'pointer' }}
                          title="Editar Productora"
                        >
                          <i className="fas fa-edit me-1"></i>
                          Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleEliminar(productor)}
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