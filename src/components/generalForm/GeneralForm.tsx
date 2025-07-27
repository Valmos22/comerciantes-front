import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getMunicipios } from '../../services/comerciantesService';
import type { Municipio } from '../../utils/ComercianteType';
import { departments } from '../../utils/Departments';
import styles from './GeneralForm.module.css';

type FormMode = 'create' | 'update';

const generalDataSchema = z.object({
    nombreRazonSocial: z.string().min(1, 'La razón social es obligatoria'),
    departamento: z.string().min(1, 'Seleccione un departamento'),
    municipio: z.string().min(1, 'Seleccione una ciudad'),
    telefono: z.string().optional(),
    correoElectronico: z.string().email('Correo inválido').optional(),
    fechaRegistro: z.string().min(1, 'La fecha es obligatoria'),
    poseeEstablecimientos: z.boolean().optional(),
});

export type GeneralDataForm = z.infer<typeof generalDataSchema> & {
    totalIngresos?: number;
    totalEmpleados?: number;
};

interface Props {
    mode?: FormMode;
    defaultValues?: Partial<GeneralDataForm>;
    onSubmit: (data: GeneralDataForm) => void;
}

export const GeneralForm: React.FC<Props> = ({
    defaultValues = {},
    onSubmit,
    mode = 'create',
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<GeneralDataForm>({
        resolver: zodResolver(generalDataSchema),
        defaultValues,
    });

    const [municipios, setMunicipios] = useState<Municipio[]>([]);
    const [loadingMunicipios, setLoadingMunicipios] = useState<boolean>(true);

    useEffect(() => {
        if (defaultValues) {
            Object.entries(defaultValues).forEach(([key, value]) => {
                if (value !== undefined) {
                    setValue(key as keyof GeneralDataForm, value);
                }
            });
        }
    }, [defaultValues, setValue]);

    useEffect(() => {
        const fetchMunicipios = async () => {
            try {
                const data = await getMunicipios();
                setMunicipios(data);
            } catch (error) {
                console.error('Error al obtener municipios:', error);
            } finally {
                setLoadingMunicipios(false);
            }
        };

        fetchMunicipios();
    }, []);

    const totalIngresos = watch('totalIngresos');
    const totalEmpleados = watch('totalEmpleados');

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${styles.container_form}`}
        >
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white shadow-md rounded ${styles.form_items}`}>
                <div>
                    <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                        {mode === 'create' ? 'Nuevo Comerciante' : 'Editar Comerciante'}
                    </h1>
                    <hr />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white">
                    <div className="flex flex-col">
                        <label>Razón Social *</label>
                        <input {...register('nombreRazonSocial')} className="input" />
                        {errors.nombreRazonSocial && <span className="text-red-500 text-sm">{errors.nombreRazonSocial.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label>Correo electrónico</label>
                        <input {...register('correoElectronico')} className="input" />
                        {errors.correoElectronico && <span className="text-red-500 text-sm">{errors.correoElectronico.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label>Departamento *</label>
                        <select {...register('departamento')} className="input">
                            <option value="">Seleccione</option>
                            {departments.map((dep) => (
                                <option key={dep} value={dep}>
                                    {dep}
                                </option>
                            ))}
                        </select>
                        {errors.departamento && <span className="text-red-500 text-sm">{errors.departamento.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label>Fecha de registro *</label>
                        <input type="date" {...register('fechaRegistro')} className="input" />
                        {errors.fechaRegistro && <span className="text-red-500 text-sm">{errors.fechaRegistro.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label>Ciudad *</label>
                        <select {...register('municipio')} className="input">
                            <option value="">Seleccione</option>
                            {municipios.map((city) => (
                                <option key={city.id} value={city.nombre}>
                                    {city.nombre}
                                </option>
                            ))}
                        </select>
                        {errors.municipio && <span className="text-red-500 text-sm">{errors.municipio.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label>Teléfono</label>
                        <input type="tel" {...register('telefono')} className="input" />
                    </div>

                    <div className="flex items-center gap-2 col-span-2">
                        <input type="checkbox" {...register('poseeEstablecimientos')} />
                        <label>¿Posee establecimientos?</label>
                    </div>
                </div>
            </div>


            <div className={`${styles.form_button}`}>
                {mode === 'update' && (
                    <>
                        <div className={`${styles.total}`}>
                            <span>Total ingreso establecimientos</span>
                            <span>${(totalIngresos || 0).toLocaleString()}</span>
                        </div>
                        <div className={`${styles.cant}`}>
                            <span>Cantidad de empleados</span>
                            <span>{totalEmpleados || 0}</span>
                        </div>
                    </>
                )}
                <div className={`${styles.button}`}>
                    <span>Si ya ingresaste todos los datos, crea tu formulario aqui</span>
                    <button
                        type="submit"
                        className="text-white bg-pink-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-pink-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Enviar formulario
                    </button>
                </div>
            </div>
        </form>
    );
};
