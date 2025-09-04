import { NavLink } from "react-router";
import Boton from "../../../components/Boton";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimeraLetraMayuscula } from "../../../validaciones/Validaciones";

export default function CrearGenero(){
    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<FormType>({
        resolver: yupResolver(reglasDeValidacion), mode: 'onChange'
    });

    const onSubmit: SubmitHandler<FormType> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    } 
    return (
        <>
            <h3>Crear Género</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input autoComplete="off" className="form-control" {...register('nombre')}/>
                    {errors.nombre && <p className="error">{errors.nombre.message}</p>}
                </div>
                <div className="mt-2">
                    <Boton type='submit' disabled={!isValid || isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</Boton>
                    <NavLink to="/generos" className="btn btn-secondary ms-2">Cancelar</NavLink>
                </div>
            </form>
        </>
        
    )
}

interface FormType{
    nombre: string;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es obligatorio.').test(PrimeraLetraMayuscula())
})