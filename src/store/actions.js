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
  document.documentElement.style.setProperty('--color-student-primary', colorMap[new_color].primaryColor);
  document.documentElement.style.setProperty('--color-student-primary-light', colorMap[new_color].primaryLightColor);
  document.documentElement.style.setProperty('--color-student-secondary', colorMap[new_color].secondaryColor);


  return {
    type: 'PROFILE_COLOR',
    payload: colorMap[new_color]
  };
};
