import { getToken } from '~/services/authServices';

export const getHeaderConfig = (contentType) => {
    return {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
    };
};
