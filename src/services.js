import axios from 'axios';

const url = 'http://ranekapi.local/wp-json';

const axiosInstance = axios.create({
  baseURL: `${url}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line prefer-destructuring
    const token = window.localStorage.token;
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => { Promise.reject(error); },
);

// eslint-disable-next-line import/prefer-default-export
export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(body) {
    return axios.post(`${url}/jwt-auth/v1/token`, body);
  },
  validateToken() {
    return axiosInstance.post(`${url}/jwt-auth/v1/token/validate`);
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
