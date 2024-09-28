import React from 'react';
import { Navigate } from 'react-router-dom';
import config from '~/config';
import { getUserRole } from '~/services/authServices';

function AdminRoute({ children }) {
    return getUserRole() === 'admin' ? children : <Navigate to={config.routes.noaccess} />;
}

export default AdminRoute;
