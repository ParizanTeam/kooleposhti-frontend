import apiInstance from '../utils/axiosConfig';
import {baseUrl,history} from '../utils/constants';
import {colorMap} from '../components/StudentProfile/constant'

export const login = () => async (dispatch) => {
  const response = await apiInstance.get(`${baseUrl}/accounts/users/me`, {
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

export const remove_token = () => {
  localStorage.removeItem('access_token');
  history.push("/login");
  return {
    type: 'LOGOUT',
  };
};

export const logout = () => {
  localStorage.removeItem('access_token');
  return {
    type: 'LOGOUT',
  };
};

export const change_profile_color = (new_color) => {
  return {
    type: 'PROFILE_COLOR',
    payload: colorMap[new_color]
  };
};
