/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './style.module.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            correoElectronico: 'admin@gmail.com',
            contrasena: '112233',
            aceptarTerminos: false,
        },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (data: any) => {

        const { correoElectronico, contrasena } = data;

        if (!data.aceptarTerminos) {
            setError('Debes aceptar los términos y condiciones');
            return;
        }

        try {
            setError(null);
            setLoading(true);
            await login({ correoElectronico, contrasena });
            navigate('/dashboard/comerciantes/reporte');
        } catch (err) {
            setError('Credenciales incorrectas o error de red');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`rounded-lg shadow bg-white dark:bg-gray-800 ${styles.login_container}`}>
            <div className={`${styles.login_p}`}>
                <p className='text-gray-900 dark:text-white'>
                    Digita tu documento de identidad del propietario o 
                    representante legal y la contraseña
                </p>
                <hr />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='p-6 '>
                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Correo Electrónico
                    </label>
                    <input
                        {...register('correoElectronico', { required: 'Este campo es obligatorio' })}
                        type="email"
                        className="w-full p-2 border rounded"
                        placeholder="ejemplo@correo.com"
                    />
                    {errors.correoElectronico && (
                        <p className="text-red-500 text-sm">{errors.correoElectronico.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Contraseña
                    </label>
                    <input
                        {...register('contrasena', { required: 'Este campo es obligatorio' })}
                        type="password"
                        className="w-full p-2 border rounded"
                        placeholder="Contraseña"
                    />
                    {errors.contrasena && (
                        <p className="text-red-500 text-sm">{errors.contrasena.message}</p>
                    )}
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="terminos"
                        type="checkbox"
                        {...register('aceptarTerminos')}
                        className="w-4 h-4 border rounded"
                    />
                    <label htmlFor="terminos" className="ml-2 text-sm text-gray-900 dark:text-white">
                        Acepto los términos y condiciones
                    </label>
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
            </form>
        </div>
    );
};

export default Login;
