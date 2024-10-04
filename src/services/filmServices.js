import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/film/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const getbyslug = async (slug) => {
    try {
        const response = await httpRequest.get(`film/get/${slug}`, getHeaderConfig());
        return response;
    } catch (err) {}
};
const add = async (data = {}) => {
    const response = await httpRequest.post('/film/add', data, getHeaderConfig());
    return response;
};
const update = async (data = {}) => {
    const response = await httpRequest.post(`/film/update/${data.id}`, data, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/film/delete/${id}`, getHeaderConfig());
    return response;
};
const changeFilmImage = async (id, imageFile) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('imageFile', imageFile);
    const response = await httpRequest.post(`/film/changefilmimage/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)}`,
        },
    });
    console.log(response);
    return response;
};
const changeFilmPoster = async (id, posterFile) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('posterFile', posterFile);
    const response = await httpRequest.post(`/film/changefilmposter/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(process.env.REACT_APP_TOKEN_NAME)}`,
        },
    });
    console.log(response);
    return response;
};

const getByCategory = async (pagenumber, pagesize, categoryId) => {
    try {
        const response = await httpRequest.get(`film/getbycategory/${categoryId}`, {
            params: {
                pagenumber: pagenumber,
                pagesize: pagesize,
            },
        });
        return response;
    } catch (error) {}
};
const search = async (pagenumber, pagesize, name) => {
    try {
        const response = await httpRequest.get(`film/search`, {
            params: {
                pagenumber: pagenumber,
                pagesize: pagesize,
                name: name,
            },
        });
        return response.data;
    } catch (error) {}
};
const filter = async (pagenumber, pagesize, name, countryId, categoryId) => {
    try {
        const response = await httpRequest.get(`film/filter`, {
            params: {
                pagenumber: pagenumber,
                pagesize: pagesize,
                name: name,
                country: countryId,
                categoryId: categoryId,
            },
        });
        return response.data;
    } catch (error) {}
};

export { getall, getbyslug, add, update, del, changeFilmImage, changeFilmPoster, getByCategory, search, filter };
