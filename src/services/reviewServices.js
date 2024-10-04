import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/review/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const getByFilm = async (filmId) => {
    try {
        const response = await httpRequest.get(`/review/getbyfilm/${filmId}`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (data = {}) => {
    const response = await httpRequest.post('/review/add', data, getHeaderConfig());
    return response;
};
const update = async (id, rate) => {
    const response = await httpRequest.post(`/review/update/${id}`, { rate }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/review/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, getByFilm, add, update, del };
