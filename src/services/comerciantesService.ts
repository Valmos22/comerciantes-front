// src/services/comerciantesService.ts
import axios from 'axios';

const API = 'http://localhost:8080/api';

const getToken = () => localStorage.getItem('token');

export interface Municipio {
  id: number;
  nombre: string;
}

const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getMunicipios = async (): Promise<Municipio[]> => {
  const res = await axiosInstance.get('/municipios');
  return res.data.data || res.data;
};

export const getComercianteById = async (id: number): Promise<any> => {
  const res = await axiosInstance.get(`/comerciantes/${id}`);
  return res.data.data || res.data;
};

export const createOrUpdateComerciante = async (data: any): Promise<void> => {
  if (data.id) {
    await axiosInstance.put(`/comerciantes/${data.id}`, data);
  } else {
    await axiosInstance.post('/comerciantes', data);
  }
};
