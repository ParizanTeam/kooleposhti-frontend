import React from 'react';
import { Redirect, Route } from 'react-router';
import useSelector from 'react-redux';

const PrivateRoute = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <Route {...props} /> : <Redirect to={'/'} />;
};

export default PrivateRoute;
