import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/country/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (name) => {
    const response = await httpRequest.post(
        '/country/add',
        {
            name,
        },
        getHeaderConfig(),
    );
    return response;
};
const update = async (id, name) => {
    const response = await httpRequest.post(`/country/update/${id}`, { name }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/country/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, add, update, del };
