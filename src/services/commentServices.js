import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getByFilm = async (filmId) => {
    try {
        const response = await httpRequest.get(`/comment/all?filmid=${filmId}`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (filmId, content) => {
    const response = await httpRequest.post('/comment/add', { filmId, content }, getHeaderConfig());
    return response;
};
const update = async (data = {}) => {
    const response = await httpRequest.post(`/comment/update/${data.id}`, data, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/comment/delete/${id}`, getHeaderConfig());
    return response;
};
export { getByFilm, add, update, del };
