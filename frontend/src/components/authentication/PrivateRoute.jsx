
import React from 'react';
import { Navigate } from 'react-router-dom';
import UnauthorizedError from '../authentication/UnauthorizedError';

const PrivateRoute = ({ element: Component, role, ...rest }) => {
  const token = localStorage.getItem('token');
  const storedRole = localStorage.getItem('role');

  if (token && storedRole === role) {
    return <Component {...rest} />;
  }

  if (!token) {
    alert('You are not allowed to access')
    return <Navigate to="/auth/signin" />;
  }

  return <UnauthorizedError />;
};

export default PrivateRoute;
