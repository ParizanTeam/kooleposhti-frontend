import Axios from 'axios';

const apiInstance = Axios.create();

apiInstance.interceptors.request.use(
  config => {
    const access_token = localStorage.getItem('access_token');
    if (token) {
      config.headers.authorization = access_token;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default apiInstance;
