import { formatISO } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrUpdateComerciante, getComercianteById, getMunicipios } from "../../services/comerciantesService";

interface FormData {
  nombreRazonSocial: string;
  municipio: string; // puede ser string o id si prefieres
  telefono?: string;
  correoElectronico?: string;
  fechaRegistro: string;
  estado: "Activo" | "Inactivo";
  poseeEstablecimientos: boolean;
}

interface Municipio {
  id: number;
  nombre: string;
}

const defaultValues: FormData = {
  nombreRazonSocial: "",
  municipio: "",
  telefono: "",
  correoElectronico: "",
  fechaRegistro: formatISO(new Date(), { representation: "date" }),
  estado: "Activo",
  poseeEstablecimientos: false
};

export default function ComercianteForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({ defaultValues });

  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [resumenEstablecimientos, setResumenEstablecimientos] = useState({ totalEmpleados: 0, totalIngresos: 0 });

  useEffect(() => {
    getMunicipios().then(setMunicipios);
    if (isEdit) {
      getComercianteById(Number(id)).then(data => {
        Object.entries(data).forEach(([key, value]) => {
          if (key in defaultValues) {
            setValue(key as keyof FormData, value);
          }
        });
        setResumenEstablecimientos({
          totalEmpleados: data.totalEmpleados ?? 0,
          totalIngresos: data.totalIngresos ?? 0
        });
      });
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await createOrUpdateComerciante({ ...data, id: isEdit ? Number(id) : undefined });
      toast.success(`Comerciante ${isEdit ? "actualizado" : "creado"} correctamente`);
    } catch (err) {
      toast.error("Error al guardar el comerciante");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto p-4">
      <h2 className="text-xl font-semibold">{isEdit ? "Editar Comerciante" : "Nuevo Comerciante"}</h2>

      <div>
        <label>Nombre o Razón Social</label>
        <input {...register("nombreRazonSocial", { required: true })} className="input" />
        {errors.nombreRazonSocial && <p className="text-red-500 text-sm">Este campo es obligatorio</p>}
      </div>

      <div>
        <label>Municipio</label>
        <select {...register("municipio", { required: true })} className="input">
          <option value="">Seleccione un municipio</option>
          {municipios.map(m => (
            <option key={m.id} value={m.nombre}>{m.nombre}</option>
          ))}
        </select>
        {errors.municipio && <p className="text-red-500 text-sm">Campo obligatorio</p>}
      </div>

      <div>
        <label>Teléfono</label>
        <input {...register("telefono", { maxLength: 20 })} className="input" />
      </div>

      <div>
        <label>Correo Electrónico</label>
        <input
          {...register("correoElectronico", {
            pattern: { value: /^\S+@\S+$/i, message: "Correo no válido" }
          })}
          className="input"
        />
        {errors.correoElectronico && <p className="text-red-500 text-sm">{errors.correoElectronico.message}</p>}
      </div>

      <div>
        <label>Fecha de Registro</label>
        <input type="date" {...register("fechaRegistro", { required: true })} className="input" />
        {errors.fechaRegistro && <p className="text-red-500 text-sm">Campo obligatorio</p>}
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" {...register("poseeEstablecimientos")} />
        <label>¿Posee establecimientos?</label>
      </div>

      {isEdit && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-sm">
          <p>Total Empleados: <strong>{resumenEstablecimientos.totalEmpleados}</strong></p>
          <p>Total Ingresos: <strong>${resumenEstablecimientos.totalIngresos.toLocaleString()}</strong></p>
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
