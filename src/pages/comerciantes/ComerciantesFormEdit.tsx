import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { GeneralForm, type GeneralDataForm } from "../../components/generalForm/GeneralForm";
import { createOrUpdateComerciante, getComercianteById } from "../../services/comerciantesService";

const ComerciantesFormEdit = () => {

    const navigate = useNavigate();
    const [comerciante, setComerciante] = useState<GeneralDataForm>();
    const { id } = useParams();

    useEffect(() => {
        const fetchComerciante = async () => {
            if (!id) return; // Si no hay id, no hace nada
            try {
                const data = await getComercianteById(Number(id));
                console.log(data)
                setComerciante(data);
            } catch (error) {
                console.error("Error al obtener comerciante:", error);
            }
        };

        fetchComerciante();
    }, [id]);

    const handleFormSubmit = async (data: GeneralDataForm) => {
        try {
            console.log('Datos enviados:', data);

            const dataSend = {
                id: Number(id),
                "nombreRazonSocial": data.nombreRazonSocial,
                "municipio": data.municipio,
                "telefono": data.telefono,
                "correoElectronico": data.correoElectronico,
                "estado": "Activo"
            }

            await createOrUpdateComerciante(dataSend);

            toast.success('Comerciante actualizado exitosamente');
            navigate('/dashboard/comerciantes/reporte')
        } catch (error) {
            toast.error('Error al actualizar el comerciante');
            console.error('Error al actualizar el comerciante:', error);
        }
    };

    return (
        <div className="mt-7" style={{ marginTop: "7rem" }}>
            <h1 className="text-2xl font-bold mb-6">Empresa </h1>
            <GeneralForm
                mode="update"
                defaultValues={{
                    nombreRazonSocial: comerciante?.nombreRazonSocial,
                    municipio: comerciante?.municipio,
                    telefono: comerciante?.telefono,
                    correoElectronico: comerciante?.correoElectronico,
                    fechaRegistro: comerciante?.fechaRegistro,
                    totalEmpleados: 0,
                    totalIngresos: 0
                }}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default ComerciantesFormEdit