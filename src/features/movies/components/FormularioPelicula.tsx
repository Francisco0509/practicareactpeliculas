import { useForm, type SubmitHandler } from "react-hook-form";
import type PeliculaCreacion from "../models/PeliculaCreacion.model";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import Boton from "../../../components/Boton";
import { NavLink } from "react-router";
import SeleccionarImagen from "../../../components/SelecionarImagen";
export default function FormularioPelicula(props: FormulaioPeliculaProps){
    const {
        register, handleSubmit,setValue,
        formState: {errors, isValid, isSubmitting}
    } = useForm<PeliculaCreacion>({
        resolver: yupResolver(reglasDeValidacion),
        mode: 'onChange',
        defaultValues: props.modelo ?? {titulo: ''}
    })

    const imagenActual: string | undefined = props.modelo?.poster ? props.modelo.poster as string : undefined;
    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input type="text" id="titulo" autoComplete="off" className="form-control"
                {...register('titulo')} />
                {errors.titulo && <p className="error">{errors.titulo.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="fechaLanzamiento">Fecha de lanzamiento</label>
                <input type="date" id="fechaLanzamiento" autoComplete="off" className="form-control"
                {...register('fechaLanzamiento')} />
                {errors.fechaLanzamiento && <p className="error">{errors.fechaLanzamiento.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="trailer">Trailer (Youtube)</label>
                <input type="text" id="trailer" autoComplete="off" className="form-control"
                {...register('trailer')} />
            </div>
            <SeleccionarImagen label="Poster" imagenURL={imagenActual} imagenSeleccionada={poster => {
                setValue('poster', poster);
            }} />
            <div className="mt-2">
                <Boton type="submit" disabled={!isValid || isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar'}</Boton>
                <NavLink to="/" className="btn btn-secondary ms-2">Cancelar</NavLink>
            </div>
        </form>
    )
}

interface FormulaioPeliculaProps{
    modelo?: PeliculaCreacion;
    onSubmit: SubmitHandler<PeliculaCreacion>;
}

const reglasDeValidacion = yup.object({
    titulo: yup.string().required('El título es obligatorio.'),
    fechaLanzamiento: yup.string().required('La fecha de lanzamiento es obligatoria.')
})