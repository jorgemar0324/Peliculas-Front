import { axiosConfig} from '../helpers/axios-config.js';

const getDirectors = async () => {
    const response = await axiosConfig.get('/director');
    return response.data;
}

const getDirectorById = async (id) => {
    const response = await axiosConfig.get(`/director/${id}`);
    return response.data;
}   

const createDirector = async (director) => {
    const response = await axiosConfig.post('/director', director);
    return response.data;
}

const updateDirector = async (id, director) => {
    const response = await axiosConfig.put(`/director/${id}`, director);
    return response.data;
}

const deleteDirector = async (id) => {
    const response = await axiosConfig.delete(`/director/${id}`);
    return response.data;
}

export { getDirectors, getDirectorById, createDirector, updateDirector, deleteDirector };