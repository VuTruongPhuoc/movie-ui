import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get(`/section/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (name) => {
    const response = await httpRequest.post(
        '/section/add',
        {
            name,
        },
        getHeaderConfig(),
    );
    return response;
};
const update = async (id, name) => {
    const response = await httpRequest.post(`/section/update/${id}`, { name }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/section/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, add, update, del };
