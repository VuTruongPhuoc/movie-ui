import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as authServices from '~/services/authServices';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState();
    const [accessToken, setAccessToken] = useState();
    const login = async (username, password) => {
        try {
            const response = await authServices.login(username, password);
            const accessToken = response?.accessToken;
            localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, accessToken);
            setAccessToken(accessToken);
            setUsername(response.username);
            toast.success(response.message);
        } catch (err) {
            if (!err.response) {
                toast.error('Server không phản hồi');
            } else {
                toast.error(err.response.data.message);
            }
        }
    };
    const logout = () => {
        localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
        setAccessToken(null);
        setUsername(null);
    };

    return <AuthContext.Provider value={{ username, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
