import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/episode/all/`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const getbyfilm = async (filmId) => {
    try {
        const response = await httpRequest.get(`/episode/${filmId}`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (data = {}) => {
    const response = await httpRequest.post('/episode/add', data, getHeaderConfig());
    return response;
};
const update = async (data = {}) => {
    const response = await httpRequest.post(`/episode/update/${data.id}`, data, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/episode/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, add, update, del };
