import axiosInstance from '../api/axios';
import type { Comerciante, Municipio } from '../utils/ComercianteType';

export const getComerciantes = async (): Promise<Comerciante[]> => {
  const res = await axiosInstance.get('/comerciantes');
  return res.data.data || res.data;
};

export const createOrUpdateComerciante = async (data: any, id: number): Promise<void> => {
  if (id) {
    await axiosInstance.put(`/comerciantes/${data.id}`, data);
  } else {
    await axiosInstance.post('/comerciantes', data);
  }
};

export const getMunicipios = async (): Promise<Municipio[]> => {
  const res = await axiosInstance.get('/municipios');
  return res.data.data || res.data;
};

export const getComercianteById = async (id: number): Promise<any> => {
  const res = await axiosInstance.get(`/comerciantes/${id}`);
  return res.data.data || res.data;
};

export const deleteComercianteById = async (id: number): Promise<any> => {
  const res = await axiosInstance.delete(`/comerciantes/${id}`);
  return res.data.data || res.data;
};

export const descargarCSV = async () => {
  try {
    const response = await axiosInstance.get("/comerciantes/estadisticas/csv", {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "comerciantes.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error al descargar el CSV:", error);
  }
};
