import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async (page, pageSize) => {
    try {
        const response = await httpRequest.get(`/user/all?pageNumber=${page}&pageSize=${pageSize}`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (username, displayname, email) => {
    const response = await httpRequest.post(
        '/user/add',
        {
            username,
            displayname,
            email,
        },
        getHeaderConfig(),
    );
    return response;
};
const update = async (id, username, displayname, email) => {
    const response = await httpRequest.post(`/user/update/${id}`, { username, displayname, email }, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/user/delete/${id}`, getHeaderConfig());
    return response;
};
const changerole = async (username, rolename) => {
    const response = await httpRequest.post(`/user/changerole/${username}/${rolename}`);
    return response;
};
export { getall, add, update, del, changerole };
