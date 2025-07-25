import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./ComerciantesTable.css";

interface Comerciante {
  id: number;
  nombreRazonSocial: string;
  telefono: string | null;
  correoElectronico: string | null;
  fechaRegistro: string;
  cantidadEstablecimientos: number;
  estado: string;
}

const ComerciantesTable = () => {
  const { token, user } = useAuth();
  const [comerciantes, setComerciantes] = useState<Comerciante[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch("http://localhost:8080/api/comerciantes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setComerciantes(data.data || data);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (id: number) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este comerciante?");
    if (!confirm) return;

    const res = await fetch(`http://localhost:8080/api/comerciantes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setComerciantes((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Comerciantes</h1>

      <div className="flex justify-between items-center mb-2">
        <select
          className="border rounded p-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((num) => (
            <option key={num}>{num}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {user?.rol === "Administrador" && (
            <button
              className="bg-green-600 text-white px-4 py-1 rounded"
              onClick={() =>
                window.location.assign("/dashboard/comerciantes/reporte")
              }
            >
              Descargar CSV
            </button>
          )}
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={() => window.location.assign("/dashboard/comerciantes/nuevo")}
          >
            Nuevo
          </button>
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
                <td className="border p-2 td_table">{c.nombreRazonSocial}</td>
                <td className="border p-2 td_table">{c.telefono || "—"}</td>
                <td className="border p-2 td_table">{c.correoElectronico || "—"}</td>
                <td className="border p-2 td_table">{c.fechaRegistro}</td>
                <td className="border p-2 td_table">{c.cantidadEstablecimientos}</td>
                <td className="border p-2 td_table">{c.estado}</td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-2 rounded"
                    onClick={() =>
                      window.location.assign(`/dashboard/comerciantes/editar/${c.id}`)
                    }
                  >
                    Editar
                  </button>
                  <button
                    className="bg-purple-500 text-white px-2 rounded"
                    onClick={() =>
                      console.log("Activar/Inactivar lógica aquí") // luego lo conectamos
                    }
                  >
                    {c.estado === "Activo" ? "Inactivar" : "Activar"}
                  </button>
                  {user?.rol === "Administrador" && (
                    <button
                      className="bg-red-500 text-white px-2 rounded"
                      onClick={() => handleDelete(c.id)}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComerciantesTable;
