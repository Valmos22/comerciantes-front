import { useForm, type SubmitHandler } from "react-hook-form";
import type { IFormInput } from "../../utils/FormTransactionType";
import styles from './FormTransaction.module.css';

export interface FormTransactionProps {
    onSubmit: SubmitHandler<IFormInput>;
}

const FormTransaction = ({ onSubmit }: FormTransactionProps) => {
    const { register, handleSubmit } = useForm<IFormInput>()

    return (

        <form className={`${styles.form_createt}`} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Seleccionar Tipo</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("type")}>
                    <option value="income">Ingresos</option>
                    <option value="expense">Gastos</option>
                </select>
            </div>

            <div>
                <label>Categoria</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("category")} />
            </div>

            <div>
                <label>Cantidad</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="number" {...register("amount")} />
            </div>

            <div>
                <label>Fecha</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="date" {...register("date")} />
            </div>

            <div>
                <label>Descripcion</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  {...register("description")} />
            </div>

            <div>
                <input className="focus:outline-none text-white bg-blue-700 hover:bg-blue-300 focus:ring-4 focus:ring-yellow-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-700" type="submit" />
            </div>
        </form>
    )
}

export default FormTransaction