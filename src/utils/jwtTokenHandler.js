import { jwtDecode } from 'jwt-decode';

const jwtTokenHandler = () => {
    const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    if (token) {
        const decoded = jwtDecode(token);
        return decoded;
    }
    return null;
};

export default jwtTokenHandler;
