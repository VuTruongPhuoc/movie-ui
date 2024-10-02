import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getByComment = async (commentId) => {
    try {
        const response = await httpRequest.get(`/feedback/all?commentid=${commentId}`, getHeaderConfig());
        return response.data;
    } catch (err) {}
};
const add = async (commentId, content) => {
    const response = await httpRequest.post('/feedback/add', { commentId, content }, getHeaderConfig());
    return response;
};
const update = async (data = {}) => {
    const response = await httpRequest.post(`/feedback/update/${data.id}`, data, getHeaderConfig());
    return response;
};
const del = async (id) => {
    const response = await httpRequest.del(`/feedback/delete/${id}`, getHeaderConfig());
    return response;
};
export { getByComment, add, update, del };
