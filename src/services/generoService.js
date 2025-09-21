import { axiosConfig} from '../helpers/axios-config.js';

const getGeneros = async () => {
    const response = await axiosConfig.get('/genero');
    return response.data;
}

const getGeneroById = async (id) => {
    const response = await axiosConfig.get(`/genero/${id}`);
    return response.data;
}

const createGenero = async (genero) => {
    const response = await axiosConfig.post('/genero', genero);
    return response.data;
}

const updateGenero = async (id, genero) => {
    const response = await axiosConfig.put(`/genero/${id}`, genero);
    return response.data;
}

const deleteGenero = async (id) => {
    const response = await axiosConfig.delete(`/genero/${id}`);
    return response.data;
}   

export { getGeneros, getGeneroById, createGenero, updateGenero, deleteGenero };