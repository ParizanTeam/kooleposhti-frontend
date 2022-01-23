import React from 'react';
import { Redirect, Route } from 'react-router';
import {useSelector} from 'react-redux';

const PrivateRoute = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <Route {...props} /> : <Redirect to={'/'} />;
};



export const StudentPrivateRoute = props => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const roles = useSelector(state => state.auth.roles);
  return (isAuthenticated && roles[0]==="student") ? <Route {...props} /> : <Redirect to={'/login'} />;
};

export default PrivateRoute;
