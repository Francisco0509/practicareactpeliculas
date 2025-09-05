import { useForm, type SubmitHandler } from "react-hook-form";
import type ActorCreacion from "../models/ActorCreacion.mode";
import Boton from "../../../components/Boton";
import { NavLink } from "react-router";
import * as yup from 'yup';
import { fechaNoPuedeSerFutura, PrimeraLetraMayuscula } from "../../../validaciones/Validaciones";
import { yupResolver } from "@hookform/resolvers/yup";

export default function FormularioActor(props: FormularioActorProps){
    const {
        register,
        handleSubmit,
        formState: {errors,isValid,isSubmitting}
    } = useForm<ActorCreacion>({
        resolver: yupResolver(reglasDeValidacion),
        mode: 'onChange',
        defaultValues: props.modelo ?? {nombre: ''}
    });

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" 
                        id="nombre" 
                        autoComplete="off" 
                        className="form-control"
                        {...register('nombre')}/>
                {errors.nombre && <p className="error">{errors.nombre.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="fechaNacimiento">Fecha nacimiento</label>
                <input type="date" 
                        id="fechaNacimiento" 
                        autoComplete="off" 
                        className="form-control"
                        {...register('fechaNacimiento')}/>
                {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento.message}</p>}
            </div>

            <div className="mt-2">
                <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</Boton>
                <NavLink to="/actores" className="btn btn-secondary ms-2">Cancelar</NavLink>
            </div>
        </form>
    )
}

interface FormularioActorProps{
    modelo?: ActorCreacion;
    onSubmit: SubmitHandler<ActorCreacion>;
}

const reglasDeValidacion = yup.object({
    nombre: yup.string().required('El nombre es obligatorio').test(PrimeraLetraMayuscula()),
    fechaNacimiento: yup.string().required('La fecha de nacimiento es obligatoria').test(fechaNoPuedeSerFutura())
})