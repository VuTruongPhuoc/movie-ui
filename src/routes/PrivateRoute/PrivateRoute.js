import AuthModals from '~/components/AuthModals';
import { isLoggedIn } from '~/services/authServices';

const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <AuthModals />;
};
export default PrivateRoute;
