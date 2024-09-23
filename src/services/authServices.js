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

export { login, register };
