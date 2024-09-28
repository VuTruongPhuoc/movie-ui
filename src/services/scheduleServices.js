import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async (page, pageSize) => {
    try {
        const response = await httpRequest.get(`/schedule/all`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (name) => {
    const response = await httpRequest.post(
        '/schedule/add',
        {
            name,
        },
        getHeaderConfig(),
    );
    return response;
};
const update = async (id, name) => {
    const response = await httpRequest.post(`/schedule/update/${id}`, { name }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/schedule/delete/${id}`, getHeaderConfig());
    return response;
};
export { getall, add, update, del };
