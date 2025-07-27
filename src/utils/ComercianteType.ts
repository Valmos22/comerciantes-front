export interface Comerciante {
  id: number;
  nombreRazonSocial: string;
  municipio: string;
  departamento?: string;
  telefono?: string;
  correoElectronico?: string;
  estado: string;
  fechaRegistro: string; // ISO format
  poseeEstablecimientos?: boolean;
}

export interface Municipio {
  id: number;
  nombre: string;
}