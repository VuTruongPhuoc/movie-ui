import { jwtDecode } from 'jwt-decode';
import { getToken } from '~/services/authServices';

const jwtTokenHandler = () => {
    var token = getToken();
    if (token) {
        const decoded = jwtDecode(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
            localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
            localStorage.removeItem(process.env.REACT_APP_CURRENT_USER);
            return null;
        }

        return decoded;
    }

    return null;
};
export default jwtTokenHandler;
