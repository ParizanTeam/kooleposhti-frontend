import axios from '../utils/axiosConfig';
import {baseUrl} from '../utils/constants';

export const login = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/accounts/users/me`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const userData = response.data
  return dispatch({
    type: 'LOGIN',
    payload: userData
  });
};

export const logout = () => {
  localStorage.removeItem('access_token');
  return {
    type: 'LOGOUT',
  };
};
