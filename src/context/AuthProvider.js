import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as authServices from '~/services/authServices';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [accessToken, setAccessToken] = useState();
    const login = async (username, password) => {
        try {
            const response = await authServices.login(username, password);
            const accessToken = response?.accessToken;

            authServices.setToken(accessToken);
            localStorage.setItem(process.env.REACT_APP_CURRENT_USER, JSON.stringify(response.user));
            setAccessToken(accessToken);
            setCurrentUser(response.user);
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
        authServices.removeToken();
        localStorage.removeItem(process.env.REACT_APP_CURRENT_USER);
        setAccessToken(null);
        setCurrentUser(null);
    };

    return <AuthContext.Provider value={{ currentUser, accessToken, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
