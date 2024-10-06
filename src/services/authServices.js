import { jwtDecode } from 'jwt-decode';
import * as httpRequest from '~/utils/httpRequest';

const login = async (username, password) => {
    return await httpRequest.post(
        '/account/login',
        { username, password },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
};
const register = async (email, username, displayname, password) => {
    return await httpRequest.post(
        '/account/register',
        { email, username, password, displayname },
        {
            headers: { 'Content-Type': 'application/json' },
        },
    );
};

const forgotPassword = async (email) => {
    return await httpRequest.post(`/account/forgotpassword?email=${email}`, {
        headers: { 'Content-Type': 'application/json' },
    });
};

const setToken = (token) => {
    localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);
};
const getToken = () => {
    const accessToken = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    if (accessToken) {
        return accessToken;
    }
    return null;
};
const removeToken = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
};
const getUserRole = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.role;
    }
};
const getUserName = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        return payload?.UserName;
    }
};
const isLoggedIn = () => {
    const token = getToken();
    if (token) {
        const payload = jwtDecode(token);
        const isLogin = Date.now() < payload.exp * 1000;
        return isLogin;
    }
    return false;
};

export { login, register, forgotPassword, setToken, getToken, removeToken, getUserRole, getUserName, isLoggedIn };
