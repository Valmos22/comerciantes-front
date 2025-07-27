import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { GeneralForm, type GeneralDataForm } from "../../components/generalForm/GeneralForm";
import { createOrUpdateComerciante } from "../../services/comerciantesService";

const ComercianteForm = () => {

  const navigate = useNavigate();

  const handleFormSubmit = async (data: GeneralDataForm) => {
    try {
      console.log('Datos enviados:', data);

      const dataSend = {
        "nombreRazonSocial": data.nombreRazonSocial,
        "municipio": data.municipio,
        "telefono": data.telefono,
        "correoElectronico": data.correoElectronico,
        "estado": "Activo"
      }

      await createOrUpdateComerciante(dataSend);

      toast.success('Comerciante guardado exitosamente');
      navigate('/dashboard/comerciantes/reporte')
    } catch (error) {
      toast.error('Error al guardar el comerciante');
      console.error('Error al guardar el comerciante:', error);
    }
  };

  return (
    <div className="mt-7" style={{ marginTop: "7rem" }}>
      <h1 className="text-2xl font-bold mb-6">Empresa 1</h1>
      <GeneralForm mode="create" onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ComercianteForm;
