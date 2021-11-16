import Axios from 'axios';
import axios from 'axios';

const apiInstance = Axios.create();

apiInstance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers['Authorization'] = 'JWT ' + access_token;
    }
    return config;
  },
  error => Promise.reject(error)
);

apiInstance.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    if (error.response) {
      const originalConfig = error.config;
      if (error.response.status === 401) {
        axios
          .post('https://kooleposhti.herokuapp.com/accounts/jwt/refresh', {
            refresh: localStorage.getItem('refresh_token'),
          })
          .then(res => {
            localStorage.setItem('access_token', res.access);
            localStorage.setItem('refresh_token', res.refresh);
          })
          .catch(err => {
            return Promise.reject(err);
          });
        return apiInstance(originalConfig);
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
