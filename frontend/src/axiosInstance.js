// src/api/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/covid', // Backend API URL
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method, config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response);
    return Promise.reject(error);
  }
);

export default instance;