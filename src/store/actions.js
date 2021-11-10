import axios from '../utils/axiosConfig';
import {baseUrl} from '../utils/constants';

export const login = () => async (dispatch) => {
  console.log("hi from login")
  const response = await axios.get(`${baseUrl}/auth/users/me`, {
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
  return {
    type: 'LOGOUT',
  };
};
