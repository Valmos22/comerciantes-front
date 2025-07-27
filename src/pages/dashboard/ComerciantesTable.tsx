import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import { deleteComercianteById, descargarCSV, getComerciantes } from "../../services/comerciantesService";
import type { Comerciante } from "../../utils/ComercianteType";
import styles from "./ComerciantesTable.module.css";

const ComerciantesTable = () => {
  const { user } = useAuth();
  const [comerciantes, setComerciantes] = useState<Comerciante[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchComerciantes = async () => {
      try {
        const data = await getComerciantes();
        setComerciantes(data);
      } catch (error) {
        console.error('Error al obtener comerciantes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComerciantes();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este comerciante?");
    if (!confirmacion) return;

    try {
      await deleteComercianteById(id);
      setComerciantes((prev) => prev.filter((c) => c.id !== id));
      toast?.success?.('Comerciante eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el comerciante:', error);
      toast?.error?.('Ocurrió un error al eliminar el comerciante');
    }
  };

  const handleDescarga = async () => {
    await descargarCSV();
  };

  return (
    <div className={`${styles.comer_container}`}>
      <h1 className="text-xl font-bold mb-4">Comerciantes</h1>

      <div className="flex justify-end items-center mb-2">

        <div className="flex gap-2">
          <button
            className="text-white bg-pink-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-pink-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => window.location.assign("/dashboard/comerciantes/nuevo")}
          >
            Crear Formulario Nuevo
          </button>
          {user?.rol === "Administrador" && (
            <button
              className="text-pink-700 border border-pink-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-pink-500 dark:text-pink-500"
              onClick={handleDescarga}
            >
              Descargar CSV
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md text-sm">
          <thead className="bg-blue-600">
            <tr>
              <th className="p-2 border">Razón Social</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Correo</th>
              <th className="p-2 border">Fecha Registro</th>
              <th className="p-2 border">No. Establecimientos</th>
              <th className="p-2 border">Estado</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {comerciantes.slice(0, pageSize).map((c) => (
              <tr key={c.id}>
                <td className={`border p-2 ${styles.td_table}`}>{c.nombreRazonSocial}</td>
                <td className={`border p-2 ${styles.td_table}`}>{c.telefono || "—"}</td>
                <td className={`border p-2 ${styles.td_table}`}>{c.correoElectronico || "—"}</td>
                <td className={`border p-2 ${styles.td_table}`}>{c.fechaRegistro}</td>
                <td className={`border p-2 ${styles.td_table}`}>{c.cantidadEstablecimientos}</td>
                <td className={`border p-2 ${styles.td_table} ${styles['estado_' + c.estado]}`}>{c.estado}</td>
                <td className={`border p-2 space-x-2 ${styles.td_buttons}`}>
                  <button
                    className="text-black-600  text-white px-2 rounded"
                    onClick={() =>
                      window.location.assign(`/dashboard/comerciantes/editar/${c.id}`)
                    }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                  </button>
                  {user?.rol === "Administrador" && (
                    <button
                      className="text-white px-2 rounded"
                      onClick={() => handleDelete(c.id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  )}
                  <button
                    className="text-white px-2 rounded"
                    onClick={descargarCSV}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mb-2" style={{ marginTop: "1rem" }}>
        <select
          className="border rounded p-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ComerciantesTable;
