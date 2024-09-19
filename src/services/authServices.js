import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as httpRequest from '~/utils/httpRequest';

export const login = async (username, password) => {
    try {
        const response = await httpRequest.post(
            '/account/login',
            { username, password },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );
        const accessToken = response?.accessToken;
        localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, accessToken);
        toast.success(response.message);
    } catch (err) {
        if (!err.response) {
            toast.error('Server không phản hồi');
        } else {
            toast.error(err.response.data.message);
        }
    }
};
export const register = async (email, username, displayname, password) => {
    try {
        const response = await httpRequest.post(
            '/account/register',
            { email, username, password, displayname },
            {
                headers: { 'Content-Type': 'application/json' },
            },
        );
        login(username, password);
        toast.success(response.message);
    } catch (err) {
        if (!err.response) {
            toast.error('Server không phản hồi');
        } else {
            toast.error(err.response.data.message);
        }
    }
};
