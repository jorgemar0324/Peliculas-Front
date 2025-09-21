import { axiosConfig} from '../helpers/axios-config.js';

const getTipos = async () => {
    const response = await axiosConfig.get('/tipo');
    return response.data;
}

const getTipoById = async (id) => {
    const response = await axiosConfig.get(`/tipo/${id}`);
    return response.data;
}

const createTipo = async (tipo) => {
    const response = await axiosConfig.post('/tipo', tipo);
    return response.data;
}

const updateTipo = async (id, tipo) => {
    const response = await axiosConfig.put(`/tipo/${id}`, tipo);
    return response.data;
}   

const deleteTipo = async (id) => {
    const response = await axiosConfig.delete(`/tipo/${id}`);
    return response.data;
}   

export { getTipos, getTipoById, createTipo, updateTipo, deleteTipo };   