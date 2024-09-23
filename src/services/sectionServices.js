import { getHeaderConfig } from '~/utils/apiHandler';
import * as httpRequest from '~/utils/httpRequest';

const getall = async () => {
    try {
        const response = await httpRequest.get('section/all', getHeaderConfig());
        return response.data;
    } catch (err) {}
};

export { getall };
