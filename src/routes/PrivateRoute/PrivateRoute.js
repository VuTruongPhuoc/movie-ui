import PropTypes from 'prop-types';

import AuthModals from '~/components/AuthModals';
import { isLoggedIn } from '~/services/authServices';

const PrivateRoute = ({ children }) => {
    return isLoggedIn() ? children : <AuthModals />;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
