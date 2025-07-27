import axios from "axios";

const API = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
