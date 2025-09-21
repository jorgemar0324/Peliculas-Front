import { axiosConfig} from '../helpers/axios-config.js';

const getProductors = async () => {
    const response = await axiosConfig.get('/productora');
    return response.data;
}

const getProductorById = async (id) => {
    const response = await axiosConfig.get(`/productora/${id}`);
    return response.data;
}   

const createProductor = async (productor) => {
    const response = await axiosConfig.post('/productora', productor);
    return response.data;
}

const updateProductor = async (id, productor) => {  
    const response = await axiosConfig.put(`/productora/${id}`, productor);
    return response.data;
}

const deleteProductor = async (id) => {
    const response = await axiosConfig.delete(`/productora/${id}`);
    return response.data;
} 
  
export { getProductors, getProductorById, createProductor, updateProductor, deleteProductor };
