import { useForm, type SubmitHandler } from "react-hook-form";
import type GeneroCreacion from "../modelos/GeneroCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router";
import Boton from "../../../components/Boton";
import { PrimeraLetraMayuscula } from "../../../validaciones/Validaciones";
import * as yup from 'yup';

export default function FormularioGenero(props: FormularioGenerosProps){
    const {register, 
            handleSubmit, 
            formState: {errors, isValid, isSubmitting}} = 
            useForm<GeneroCreacion>({
                resolver: yupResolver(reglasDeValidacion), 
                mode: 'onChange',
                defaultValues: props.modelo ?? {nombre: ''} 
            });

    return (
        <>
            
            <form onSubmit={handleSubmit(props.onSubmit)}>
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

interface FormularioGenerosProps{
    modelo?: GeneroCreacion;
    onSubmit: SubmitHandler<GeneroCreacion>;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es obligatorio.').test(PrimeraLetraMayuscula())
})