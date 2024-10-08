import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/category/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (name, slug) => {
    const response = await httpRequest.post(
        '/category/add',
        {
            name,
            slug,
        },
        getHeaderConfig(),
    );
    return response;
};
const update = async (id, name, slug) => {
    const response = await httpRequest.post(`/category/update/${id}`, { name, slug }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/category/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, add, update, del };
