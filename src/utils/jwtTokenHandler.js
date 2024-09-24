import { jwtDecode } from 'jwt-decode';

const jwtTokenHandler = () => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    if (token) {
        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
            localStorage.removeItem(process.env.REACT_APP_USER_NAME);
            return null;
        }

        return decoded;
    }

    return null;
};
export default jwtTokenHandler;
