import { axiosConfig} from '../helpers/axios-config.js';

const getMedia = async () => {
    const response = await axiosConfig.get('/media');
    return response.data;
}

const getMediaById = async (id) => {
    const response = await axiosConfig.get(`/media/${id}`);
    return response.data;
}

const createMedia = async (media) => {
    const response = await axiosConfig.post('/media', media);
    return response.data;
}

const updateMedia = async (id, media) => {
    const response = await axiosConfig.put(`/media/${id}`, media);
    return response.data;
}

const deleteMedia = async (id) => {
    const response = await axiosConfig.delete(`/media/${id}`);
    return response.data;
}   

export { getMedia, getMediaById, createMedia, updateMedia, deleteMedia };

