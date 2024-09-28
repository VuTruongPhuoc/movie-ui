import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// httpRequest.defaults.headers.common['Auth'] = AUTH_TOKEN;

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, options = {}, headers = {}) => {
    const response = await httpRequest.post(path, options, headers);
    return response.data;
};

export const del = async (path, options = {}, headers = {}) => {
    const response = await httpRequest.delete(path, options, headers);
    return response.data;
};

export default httpRequest;
